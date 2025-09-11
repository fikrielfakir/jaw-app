import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/models';

export const useAuth = () => {
  const { user, isLoading, setUser, setLoading, logout } = useAuthStore();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const userProfile: User = {
        id: data.user.id,
        email: data.user.email!,
        fullName: profile?.full_name,
        phone: profile?.phone,
        userType: profile?.user_type,
        avatarUrl: profile?.avatar_url,
        createdAt: profile?.created_at,
      };

      setUser(userProfile);
      return { user: userProfile, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: {
      fullName: string;
      userType: 'diner' | 'owner';
      phone?: string;
    }
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: userData.fullName,
            user_type: userData.userType,
            phone: userData.phone,
          });

        if (profileError) throw profileError;
      }

      return { user: data.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    logout();
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
};