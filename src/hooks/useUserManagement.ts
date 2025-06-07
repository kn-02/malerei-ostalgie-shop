
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log('Fetching users...');
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          first_name,
          last_name,
          created_at
        `);

      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }

      console.log('Profiles fetched:', profiles);

      // Get roles for each user
      const usersWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: isAdmin, error: roleError } = await supabase
            .rpc('has_role', { _user_id: profile.id, _role: 'admin' });
          
          if (roleError) {
            console.error('Error checking role for user:', profile.id, roleError);
            // Default to user role if there's an error
            return {
              ...profile,
              role: 'user' as const
            };
          }
          
          return {
            ...profile,
            role: isAdmin ? 'admin' as const : 'user' as const
          };
        })
      );

      console.log('Users with roles:', usersWithRoles);
      return usersWithRoles;
    },
  });
};

export const useAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string, role: 'admin' | 'user' }) => {
      console.log('Assigning role:', { userId, role });
      
      if (role === 'admin') {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .upsert({ user_id: userId, role: 'admin' });
        
        if (error) {
          console.error('Error adding admin role:', error);
          throw error;
        }
      } else {
        // Remove admin role (keep user as default)
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) {
          console.error('Error removing admin role:', error);
          throw error;
        }
      }
      
      console.log('Role assignment successful');
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
