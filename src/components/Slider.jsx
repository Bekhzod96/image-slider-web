import React, { useRef, useState, useEffect } from 'react';
import Left from '../assets/img/left.svg';
import Right from '../assets/img/right.svg';
import Slides from './Slides.jsx';

const Images = () => {
  const [width, setWidth] = useState(window.innerWidth),
    imgRef = useRef(null),
    childNodes = () => document.querySelector('.slider__slides').childNodes.length;
  let i = 0,
    touchstartx = null,
    locked = false;

  useEffect(() => {
    imgRef.current.style.setProperty('--childNodes', childNodes());
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

  const animate = (f = 0.8) => {
    imgRef.current.style.setProperty('--tx', '0px');
    imgRef.current.style.setProperty('--f', f);
    imgRef.current.classList.toggle('smooth', !(locked = false));
    touchstartx = null;
  };

  const lock = (e) => {
    touchstartx = unify(e).clientX;
    imgRef.current.classList.toggle('smooth', !(locked = true));
  };

  const drag = (e) => {
    e.preventDefault();

    if (locked)
      imgRef.current.style.setProperty(
        '--tx',
        `${unify(e).clientX - touchstartx}px`
      );
  };

  const move = (e) => {
    if (locked) {
      let dx = unify(e).clientX - touchstartx,
        s = Math.sign(dx),
        f = +((s * dx) / width).toFixed(2);

      if ((i > 0 || s < 0) && (i < childNodes() - 1 || s > 0) && f > 0.2) {
        imgRef.current.style.setProperty('--i', (i -= s));
        f = 1 - f;
      }
      animate(f);
    }
  };

  const handleButtonClick = (e) => {
    let direction = 0;
    if (e.target.id === 'right' && i < childNodes() - 1) direction += 1;

    if (e.target.id === 'left' && i > 0) direction -= 1;

    imgRef.current.style.setProperty('--i', (i += direction));
    animate();
  };

  const handleIndicatorClick = (e) => {
    const target = parseInt(e.target.id);
    imgRef.current.style.setProperty('--i', target);
    animate();
  };

  return (
    <div className="slider">
      <div className="slider__controller">
        <img src={Left} alt="Left" onClick={handleButtonClick} id="left" />
      </div>

      <div className="slider__container">
        <div
          className="slider__slides"
          onMouseUp={move}
          onTouchEnd={move}
          onMouseDown={lock}
          onTouchStart={lock}
          onMouseMove={drag}
          onTouchMove={drag}
          ref={imgRef}
        >
          <Slides />
        </div>

        <div className="slider__indicator">
          <div
            className="slider__indicator-dot"
            onClick={handleIndicatorClick}
            key="1"
            id="1"
          ></div>
          <div
            className="slider__indicator-dot"
            onClick={handleIndicatorClick}
            key="2"
            id="2"
          ></div>
        </div>
      </div>
      <div className="slider__controller">
        <img src={Right} alt="Right" onClick={handleButtonClick} id="right" />
      </div>
    </div>
  );
};

export default Images;
