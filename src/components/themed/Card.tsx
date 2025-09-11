import { styled } from '@tamagui/core';
import { YStack } from 'tamagui';

export const Card = styled(YStack, {
  backgroundColor: '$jawSurface',
  borderRadius: '$3',
  padding: '$4',
  borderWidth: 1,
  borderColor: '$jawBorder',

  variants: {
    elevation: {
      none: {},
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
      },
    },
  },

  defaultVariants: {
    elevation: 'small',
  },
});