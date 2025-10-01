import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { TamaguiProvider } from './providers/TamaguiProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../../global.css';

export default function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Fetch user profile
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              setUser({
                id: session.user.id,
                email: session.user.email!,
                fullName: profile.full_name,
                phone: profile.phone,
                userType: profile.user_type,
                avatarUrl: profile.avatar_url,
                createdAt: profile.created_at,
                updatedAt: profile.updated_at || profile.created_at,
              });
            }
          });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // User signed in
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              setUser({
                id: session.user.id,
                email: session.user.email!,
                fullName: profile.full_name,
                phone: profile.phone,
                userType: profile.user_type,
                avatarUrl: profile.avatar_url,
                createdAt: profile.created_at,
                updatedAt: profile.updated_at || profile.created_at,
              });
            }
          });
      } else {
        // User signed out
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}