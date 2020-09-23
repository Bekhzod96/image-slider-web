import React from 'react';
import images from '../assets/img/data';

const Images = () => {
  return (
    <div className='container'>
      {images.map((imgUrl, index) => (
        <img src={imgUrl} alt='Error' key={index} />
      ))}
    </div>
  );
};

export default Images;
