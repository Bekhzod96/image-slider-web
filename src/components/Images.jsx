import React, { useRef, useState, useEffect } from 'react';
import images from '../assets/img/data';

const Images = () => {
  const [width, setWidth] = useState(window.innerWidth),
    imgRef = useRef(null),
    item = images.length;
  let i = 0,
    x0 = null,
    locked = false;

  useEffect(() => {
    console.log(width);
    return () => '';
  }, [width]);

  useEffect(() => {
    imgRef.current.style.setProperty('--n', item);
    return () => '';
  }, []);

  window.addEventListener(
    'resize',
    () => {
      setWidth(window.innerWidth);
    },
    false
  );

  const unify = (e) => {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  const lock = (e) => {
    x0 = unify(e).clientX;
    imgRef.current.classList.toggle('smooth', !(locked = true));
  };

  const drag = (e) => {
    e.preventDefault();

    if (locked)
      imgRef.current.style.setProperty(
        '--tx',
        `${Math.round(unify(e).clientX - x0)}px`
      );
  };

  const move = (e) => {
    if (locked) {
      let dx = unify(e).clientX - x0,
        s = Math.sign(dx),
        f = +((s * dx) / width).toFixed(2);

      if ((i > 0 || s < 0) && (i < item - 1 || s > 0) && f > 0.2) {
        imgRef.current.style.setProperty('--i', (i -= s));
        f = 1 - f;
      }
      imgRef.current.style.setProperty('--tx', '0px');
      imgRef.current.style.setProperty('--f', f);
      imgRef.current.classList.toggle('smooth', !(locked = false));
      x0 = null;
    }
  };

  return (
    <div
      className='container'
      onMouseUp={move}
      onTouchEnd={move}
      onMouseDown={lock}
      onTouchStart={lock}
      onMouseMove={drag}
      onTouchMove={drag}
      ref={imgRef}
    >
      {images.map((imgUrl, index) => (
        <img src={imgUrl} alt='Error' key={index} />
      ))}
    </div>
  );
};

export default Images;
