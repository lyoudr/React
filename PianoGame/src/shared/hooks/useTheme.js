import React, {useState, useEffect} from 'react';
import { emit_color } from './ThemeChoice';

/* Custom useTheme Hook */
const useTheme = () => {
  const [themecolor, setColor] = useState('red');

  useEffect(() => {
    const $emitedColor = emit_color.subscribe((color) => {
      console.log('color is =>', color); 
      setColor(color)
    });
    // stop subscription after component umount
    return () => {
      $emitedColor.unsubscribe();
    }
  },[themecolor]);

  return themecolor;
};

const useTheme = {
  subscribeTheme : () => {
    emit_color.subscribe(color => {
      return color;
    })
  }
}

export default useTheme;
