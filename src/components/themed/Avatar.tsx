import { styled } from '@tamagui/core';
import { Avatar as TamaguiAvatar } from 'tamagui';

export const Avatar = styled(TamaguiAvatar, {
  circular: true,
  backgroundColor: '$jawSurface',
  borderColor: '$jawBorder',
  borderWidth: 1,

  variants: {
    size: {
      small: { size: '$6' },
      medium: { size: '$8' },
      large: { size: '$10' },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});

// Export Avatar sub-components for easier usage
export const AvatarImage = TamaguiAvatar.Image;
export const AvatarFallback = styled(TamaguiAvatar.Fallback, {
  backgroundColor: '$jawPrimary',
  color: '$jawBackground',
  fontWeight: '600',
});