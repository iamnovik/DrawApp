import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free/css/all.min.css';

const ShareButtons = ({ imageUrl }) => {
    
    const shareToVK = async () => {
        const vkShareUrl = `https://vk.com/share.php?url=${encodeURIComponent(imageUrl)}&title=Смотрите%20моё%20изображение&description=Я%20создал%20это%20изображение%20в%20приложении%20для%20рисования!&comment=${encodeURIComponent(`Смотрите моё изображение: ${imageUrl}`)}`;
        window.open(vkShareUrl, '_blank');
      };
      


  return (
    <div className="share-buttons">
        
        
      <button onClick={shareToVK}><i class="fa-brands fa-vk"></i></button>
    </div>
  );
};

export default ShareButtons;
