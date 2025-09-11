import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Button } from '@/components/Button';

interface WelcomeScreenProps {
  onSelectRole: (role: 'diner' | 'owner') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectRole,
}) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to JAW</Text>
            <Text style={styles.subtitle}>
              Your complete restaurant discovery platform
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                title="I'm looking for restaurants"
                onPress={() => onSelectRole('diner')}
                variant="primary"
                size="large"
                style={styles.button}
              />
              
              <Button
                title="I'm a restaurant owner"
                onPress={() => onSelectRole('owner')}
                variant="outline"
                size="large"
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    width: '100%',
  },
});
