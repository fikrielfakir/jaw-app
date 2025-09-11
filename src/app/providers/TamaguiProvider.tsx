import React from 'react';
import { TamaguiProvider as BaseTamaguiProvider } from '@tamagui/core';
import config from '../../../tamagui.config';

interface TamaguiProviderProps {
  children: React.ReactNode;
}

export const TamaguiProvider: React.FC<TamaguiProviderProps> = ({ children }) => {
  return (
    <BaseTamaguiProvider config={config} defaultTheme="jaw_dark">
      {children}
    </BaseTamaguiProvider>
  );
};