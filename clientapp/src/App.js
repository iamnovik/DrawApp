// src/App.js
import React, { useState, useRef } from 'react';
import Canvas from './components/Canvas';
import SaveButton from './components/SaveButton';
import Toolbar from './components/Toolbar';
import ShareButtons from './components/ShareButtons';
import './App.css'
const App = () => {
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const canvasRef = useRef(null);
  const[selectedShape,setSelectedShape] = useState('free');
  const [imageUrl, setImageUrl] = useState('');
  const handleImageUpload = (url) => {
    setImageUrl(url); 
  };
  return (
    <div className='App'>
      <h1>Drawing App</h1>
      <Toolbar color={color} setColor={setColor} brushSize={brushSize} setBrushSize={setBrushSize} selectedShape={selectedShape} setSelectedShape={setSelectedShape} />
      <Canvas canvasRef={canvasRef} color={color} brushSize={brushSize} selectedShape={selectedShape} setSelectedShape={setSelectedShape} />
      <div className='UnderButtons'>
      <SaveButton canvasRef={canvasRef} onUpload={handleImageUpload}/>
      {imageUrl && <ShareButtons imageUrl={imageUrl} />}
      </div>
      
    </div>
  );
};

export default App;
