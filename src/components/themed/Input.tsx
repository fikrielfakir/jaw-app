import { styled } from '@tamagui/core';
import { Input as TamaguiInput } from 'tamagui';

export const Input = styled(TamaguiInput, {
  backgroundColor: '$jawSurface',
  borderColor: '$jawBorder',
  borderWidth: 1,
  borderRadius: '$2',
  color: '$jawTextPrimary',
  placeholderTextColor: '$jawTextMuted',

  variants: {
    size: {
      small: { size: '$3' },
      medium: { size: '$4' },
      large: { size: '$5' },
    },
    hasError: {
      true: {
        borderColor: '$jawError',
        borderWidth: 2,
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },

  focusStyle: {
    borderColor: '$jawPrimary',
    borderWidth: 2,
  },
});