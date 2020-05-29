import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

/* It is often necessary to update the context from a component that is nested somewhere deeply
in the component tree. In this case you can pass a function down through the context to allow ocnsumers to update the context:
*/
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { },
}); // 1. createContext
