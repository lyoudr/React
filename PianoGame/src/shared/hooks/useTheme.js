import React from 'react';
import { useState, useEffect } from 'react';
import { emit_color } from './ThemeChoice';

/* Custom useTheme Hook */
const useTheme = () => {
  const [themecolor, setColor] = useState('red');

  useEffect(() => {
    const $emitedColor = emit_color.subscribe((color) => setColor(color));
    // stop subscription after component umount
    return () => {
      $emitedColor.unsubscribe();
    }
  },[themecolor]);

  return themecolor;
};

export default useTheme;
