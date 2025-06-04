'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';


export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />;
}
