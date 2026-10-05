import { useState } from 'react';

export function useTheme() {
  // Lock theme to light white-and-blue theme
  return { 
    theme: 'light', 
    toggleTheme: () => {}, 
    isDark: false 
  };
}
