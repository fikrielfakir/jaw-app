import { styled } from '@tamagui/core';
import { Spinner } from 'tamagui';

export const Loader = styled(Spinner, {
  color: '$jawPrimary',

  variants: {
    size: {
      small: { size: 'small' },
      medium: { size: 'large' },
      large: { size: 'large' },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});