import { styled } from '@tamagui/core';
import { Button as TamaguiButton } from 'tamagui';

export const Button = styled(TamaguiButton, {
  borderRadius: '$2',
  fontWeight: '600',

  variants: {
    size: {
      small: { size: '$3' },
      medium: { size: '$4' },
      large: { size: '$5' },
    },
    variant: {
      primary: {
        backgroundColor: '$jawPrimary',
        color: '$jawBackground',
        hoverStyle: {
          backgroundColor: '$jawPrimaryLight',
        },
        pressStyle: {
          backgroundColor: '$jawPrimaryLight',
          scale: 0.98,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$jawPrimary',
        color: '$jawPrimary',
        hoverStyle: {
          backgroundColor: '$jawPrimary',
          color: '$jawBackground',
        },
        pressStyle: {
          backgroundColor: '$jawPrimaryLight',
          color: '$jawBackground',
          scale: 0.98,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$color',
        hoverStyle: {
          backgroundColor: '$jawSurface',
        },
        pressStyle: {
          backgroundColor: '$jawSurface',
          scale: 0.98,
        },
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
});