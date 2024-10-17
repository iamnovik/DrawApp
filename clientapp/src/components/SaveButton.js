import React from 'react';

const SaveButton = ({ canvasRef, onUpload }) => {
  const saveImage = async () => {
    if (canvasRef.current) {
      console.log("save");
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png'); 
      const blob = await fetch(dataURL).then((res) => res.blob()); 

      const formData = new FormData();
      formData.append('image', blob, 'drawing.png');

      try {
        const response = await fetch('http://localhost:5144/api/artworks/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const { fileUrl, file } = await response.json(); // Получаем URL файла и сам файл

          // Создаем blob из полученного файла
          const fileBlob = new Blob([new Uint8Array(file)], { type: 'image/png' }); // Убедитесь, что тип файла правильный
          const downloadUrl = window.URL.createObjectURL(fileBlob);
      
          const downloadLink = document.createElement('a');
          downloadLink.href = downloadUrl;
          downloadLink.setAttribute('download', 'downloaded_image.png'); 
          document.body.appendChild(downloadLink);
          downloadLink.click(); // Инициируем клик
          document.body.removeChild(downloadLink); 
      
          console.log('Image URL:', fileUrl); // Логируем URL
          onUpload(fileUrl); // Отправляем URL для дальнейших действий
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return <button onClick={saveImage}>Save Image</button>;
};

export default SaveButton;
