import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          first_name,
          last_name,
          created_at
        `);

      if (error) throw error;

      // Get roles for each user
      const usersWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: isAdmin } = await supabase
            .rpc('has_role', { _user_id: profile.id, _role: 'admin' });
          
          return {
            ...profile,
            role: isAdmin ? 'admin' : 'user'
          };
        })
      );

      return usersWithRoles;
    },
  });
};

export const useAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string, role: 'admin' | 'user' }) => {
      if (role === 'admin') {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .upsert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
      } else {
        // Remove admin role (keep user as default)
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Benutzerrolle erfolgreich aktualisiert');
    },
    onError: (error) => {
      console.error('Error assigning role:', error);
      toast.error('Fehler beim Aktualisieren der Benutzerrolle');
    },
  });
};
