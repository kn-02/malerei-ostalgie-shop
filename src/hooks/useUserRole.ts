
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useUserRole = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userRole', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      try {
        // Use the has_role function to check if user is admin
        const { data: isAdmin, error } = await supabase
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });

        if (error) {
          console.error('Error checking admin role:', error);
          return 'user'; // Default to user role on error
        }
        
        return isAdmin ? 'admin' : 'user';
      } catch (error) {
        console.error('Error fetching user role:', error);
        return 'user'; // Default to user role
      }
    },
    enabled: !!user,
  });
};

export const useIsAdmin = () => {
  const { data: role } = useUserRole();
  return role === 'admin';
};
