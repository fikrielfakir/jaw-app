import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/models';
import { ApiResponse } from '@/types/api';

export const useAuth = () => {
  const { user, isLoading, setUser, setLoading, logout } = useAuthStore();

  const signIn = async (email: string, password: string): Promise<ApiResponse<User>> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

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
        bio: profile?.bio,
        createdAt: profile?.created_at,
        updatedAt: profile?.updated_at,
      };

      setUser(userProfile);
      return { data: userProfile, error: null, success: true };
    } catch (error: any) {
      return { data: null, error: error.message, success: false };
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
  ): Promise<ApiResponse<User>> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

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

        const userProfile: User = {
          id: data.user.id,
          email: data.user.email!,
          fullName: userData.fullName,
          phone: userData.phone,
          userType: userData.userType,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setUser(userProfile);
        return { data: userProfile, error: null, success: true };
      }

      return { data: null, error: 'Failed to create user', success: false };
    } catch (error: any) {
      return { data: null, error: error.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      logout();
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
};