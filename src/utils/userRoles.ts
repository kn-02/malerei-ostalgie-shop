
import { supabase } from '@/integrations/supabase/client';

export const checkUserRole = async (userId: string): Promise<'admin' | 'user'> => {
  try {
    // First try using the has_role function
    const { data: isAdmin, error } = await supabase
      .rpc('has_role', { _user_id: userId, _role: 'admin' });

    if (error) {
      console.error('Error checking admin role:', error);
      return 'user';
    }

    return isAdmin ? 'admin' : 'user';
  } catch (error) {
    console.error('Error checking user role:', error);
    return 'user';
  }
};

export const assignUserRole = async (userId: string, role: 'admin' | 'user') => {
  try {
    const { error } = await supabase
      .from('user_roles' as any)
      .upsert({ user_id: userId, role }, { onConflict: 'user_id,role' });

    if (error) {
      console.error('Error assigning user role:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error assigning user role:', error);
    throw error;
  }
};
