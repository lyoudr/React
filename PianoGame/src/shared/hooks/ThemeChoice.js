import React from 'react';
import { useState, useEffect } from "react";
import { Subject } from 'rxjs';

export const emit_color = new Subject('red');

export const ThemeChoice = () => {
  const [color, setTheme] = useState('red');
  const colors = ['Red', 'Blue', 'Purple'];
  const chooseTheme = (color) => {
    setTheme(color);
  }
  useEffect(() => {
    emit_color.next(color);
  }, [color]);
  return (
    <div>
      {colors.map((color) =>
        <a key={color} onClick={() => chooseTheme(color)}>
          {color}
        </a>)}
    </div>
  )
};

