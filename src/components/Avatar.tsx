import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface AvatarProps {
  source?: { uri: string };
  size?: number;
  onPress?: () => void;
  showEditIcon?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 50,
  onPress,
  showEditIcon = false,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.surface,
    },
    placeholder: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    editIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary,
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const AvatarComponent = (
    <View style={styles.container}>
      {source?.uri ? (
        <Image source={source} style={styles.avatar} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="person" size={size * 0.5} color={colors.textSecondary} />
        </View>
      )}
      {showEditIcon && (
        <View style={styles.editIcon}>
          <Ionicons name="pencil" size={12} color="#FFFFFF" />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {AvatarComponent}
      </TouchableOpacity>
    );
  }

  return AvatarComponent;
};