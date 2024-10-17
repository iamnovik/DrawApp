// src/components/Canvas.js
import React, { useRef, useEffect,useState } from 'react';
import '../styles/Canvas.css'
const Canvas = ({ canvasRef,color, brushSize, selectedShape }) => {
  const previewCanvasRef = useRef(null);
  const isDrawing = useRef(false);
  const contextRef = useRef(null);
  const previewContextRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [drawnShapes, setDrawnShapes] = useState([]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;

     if (canvas && previewCanvas) {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.8;
      previewCanvas.width = canvas.width;
      previewCanvas.height = canvas.height;

      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      contextRef.current = context;

      const previewContext = previewCanvas.getContext('2d');
      previewContext.lineCap = 'round';
      previewContextRef.current = previewContext;

      redrawCanvas();
    }
  }, []);
  
  useEffect(() => {
    redrawCanvas();
  }, [color, brushSize, drawnShapes, selectedShape]);

  
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    drawnShapes.forEach(shape => {
      context.strokeStyle = shape.color;
      context.lineWidth = shape.size;

      context.beginPath();
      //console.log(shape)
      switch (shape.type) {
        case 'rectangle':
          context.rect(shape.startX, shape.startY, shape.width, shape.height);
          break;
        case 'circle':
          context.arc(shape.startX, shape.startY, shape.radius, 0, Math.PI * 2);
          break;
        case 'triangle':
          context.moveTo(shape.startX, shape.startY);
          context.lineTo(shape.endX, shape.endY);
          context.lineTo(shape.startX, shape.endY);
          context.closePath();
          break;
        case 'free':
          context.moveTo(shape.startX, shape.startY);
          context.lineTo(shape.endX, shape.endY);
          break;
        default:
          break;
      }
      context.stroke();
    });
  };
  const startDrawing = (event) => {
    console.log("start")
    isDrawing.current = true;
    const { offsetX, offsetY } = event.nativeEvent;
    setStartX(offsetX);
    setStartY(offsetY);
    setCurrentX(offsetX);
    setCurrentY(offsetY);
  };

  const stopDrawing = () => {
    isDrawing.current = false;

    if(selectedShape !== 'free'){
        const shapeData = {
            type: selectedShape,
            color: color,
            size: brushSize,
            startX: startX,
            startY: startY,
            endX: currentX,
            endY: currentY,
            width: currentX - startX,
            height: currentY - startY,
            radius: Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)),
          };
          
          setDrawnShapes(prev => [...prev, shapeData]);
    }
    previewContextRef.current.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
      redrawCanvas();

  };

  const draw = (event) => {
    if (!isDrawing.current || !contextRef.current || !previewCanvasRef.current) return;

    const { offsetX, offsetY } = event.nativeEvent;
    
    previewContextRef.current.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
      switch (selectedShape) {
        case 'rectangle':
            previewContextRef.current.beginPath();
            previewContextRef.current.rect(startX, startY, offsetX - startX, offsetY - startY);
            previewContextRef.current.closePath();
          break;
        case 'circle':
            previewContextRef.current.beginPath();
          const radius = Math.sqrt(Math.pow(offsetX - startX, 2) + Math.pow(offsetY - startY, 2));
          previewContextRef.current.arc(startX, startY, radius, 0, Math.PI * 2);
          previewContextRef.current.closePath();
          break;
        case 'triangle':
            previewContextRef.current.beginPath();
            previewContextRef.current.moveTo(startX, startY);
            previewContextRef.current.lineTo(offsetX, offsetY);
            previewContextRef.current.lineTo(startX, offsetY);
            previewContextRef.current.closePath();
          break;
        case 'free':
                previewContextRef.current.lineTo(offsetX, offsetY);
                const shapeData = {
                    type: selectedShape,
                    color: color,
                    size: brushSize,
                    startX: currentX,
                    startY: currentY,
                    endX: offsetX,
                    endY: offsetY,
                  };
                  setDrawnShapes(prev => [...prev, shapeData]);
                  previewContextRef.current.closePath();
          break;
        default:
          break;
      }
      previewContextRef.current.stroke();
    setCurrentX(offsetX);
    setCurrentY(offsetY);
    
  };

  const setColor = (newColor) => {
    if (contextRef.current && previewContextRef.current) {
      contextRef.current.strokeStyle = newColor; 
        previewContextRef.current.strokeStyle = newColor;
    }
  };

  const setBrushSize = (size) => {
    if (contextRef.current && previewContextRef.current) {
      contextRef.current.lineWidth = size; 
      previewContextRef.current.lineWidth = size;
    }
  };
  const clearCanvas = () => {
    if (contextRef.current && previewContextRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setDrawnShapes([]);
    }
  };

  useEffect(() => {
    setColor(color); 
  }, [color]);

  useEffect(() => {
    setBrushSize(brushSize); 
  }, [brushSize]);

  return (
    <div className='canvas-container'>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid black' }}
        />
        <canvas
          ref={previewCanvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          style={{ border: '1px solid black', position: 'absolute', top: 0, left: 0 }}
        /> 
      </div>
      <button onClick={clearCanvas} style={{ marginTop: '10px' }}>
        Clear
      </button>
    </div>
  );
};

export default Canvas;
