
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useProductLikes = (productId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['product-likes', productId, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_likes')
        .select('*')
        .eq('product_id', productId);

      if (error) throw error;

      const isLiked = user ? data.some(like => like.user_id === user.id) : false;
      
      return {
        totalLikes: data.length,
        isLiked,
      };
    },
    enabled: !!productId,
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('User must be logged in to like products');
      
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('product_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('product_likes')
          .delete()
          .eq('id', existingLike.id);
        
        if (error) throw error;
        return { liked: false };
      } else {
        // Like
        const { error } = await supabase
          .from('product_likes')
          .insert({
            user_id: user.id,
            product_id: productId,
          });
        
        if (error) throw error;
        return { liked: true };
      }
    },
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['product-likes', productId] });
    },
  });
};
