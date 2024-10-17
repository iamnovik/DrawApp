// src/components/Toolbar.js
import React from 'react';
import ColorPicker from './ColorPicker';
import '../styles/Canvas.css'
const Toolbar = ({ color, setColor, brushSize, setBrushSize, selectedShape, setSelectedShape }) => {
  return (
    <div className="toolbar">
      <ColorPicker color={color} setColor={setColor} />
      
      <label>
        Brush Size:
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
        />
      </label>

      <label>
        Shape:
        <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)}>
          <option value="free">Свободное рисование</option>
          <option value="rectangle">Прямоугольник</option>
          <option value="circle">Круг</option>
          <option value="triangle">Треугольник</option>
        </select>
      </label>
    </div>
  );
};

export default Toolbar;
