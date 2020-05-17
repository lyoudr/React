import React from 'react';
import { useState, useEffect } from "react";
import { Subject } from 'rxjs';
import '../../assets/sass/shared/hooks/themechoice.scss';

export const emit_color = new Subject(true);

export const ThemeChoice = () => {
  const [colorState, setTheme] = useState("darkoff");
  function toggle(e) {
    e.stopPropagation();
    setTheme(colorState === "darkoff" ? "darkon" : "darkoff");
  }
  useEffect(() => {
    emit_color.next(colorState);
  }, [colorState]);
  return (
    <div className="switch_theme">
      <label className={`switch ${colorState === 'darkoff'? 'off': 'on'}`} >
        <input type="checkbox" onClick={toggle} />
        <span className="slider round"></span>
      </label>
    </div>
  )
};

