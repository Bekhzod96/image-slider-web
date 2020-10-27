import React, { useRef, useEffect } from 'react';
import Left from '../assets/img/left.svg';
import Right from '../assets/img/right.svg';
import Slides from './Slides.jsx';

const Images = () => {
  const imgRef = useRef(null),
    childNodes = () => document.querySelector('.slider__slides').childNodes;
  let currentNodeId = 0,
    touchStartX = null,
    locked = false;

  //On laod Count childNodes set Css properity
  useEffect(() => {
    imgRef.current.style.setProperty('--childNodes', childNodes().length);
    return () => '';
  }, []);

  window.addEventListener(
    'resize',
    () => {
      location.reload()
    },
    false
  );

  // convert mobile and Computer changedTouches properity in one format
  const unify = (e) => {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  const animate = () => {
    imgRef.current.style.setProperty('--touchStartX', '0px');
    imgRef.current.classList.toggle('smooth', !(locked = false));
    touchStartX = null;
  };

  const lock = (e) => {
    touchStartX = unify(e).clientX;
    imgRef.current.classList.toggle('smooth', !(locked = true));
  };

  const drag = (e) => {
    e.preventDefault();

    if (locked)
      imgRef.current.style.setProperty(
        '--touchStartX',
        `${unify(e).clientX - touchStartX}px`
      );
  };

  const move = (e) => {
    if (locked) {
      let dx = unify(e).clientX - touchStartX,
        s = Math.sign(dx);

      if ((currentNodeId > 0 || s < 0) && (currentNodeId < childNodes().length - 1 || s > 0) ) {
        imgRef.current.style.setProperty('--currentNodeId', (currentNodeId -= s));
      }
      animate();
    }
  };

  const handleButtonClick = (e) => {
    let direction = 0;
    if (e.target.id === 'right' && currentNodeId < childNodes().length - 1) direction += 1;

    if (e.target.id === 'left' && currentNodeId > 0) direction -= 1;

    imgRef.current.style.setProperty('--currentNodeId', (currentNodeId += direction));
    animate();
  };

  // const handleIndicatorClick = (e) => {
  //   currentNodeId = parseInt(e.target.id);
  //   imgRef.current.style.setProperty('--currentNodeId', currentNodeId);
  //   animate();
  // };

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

        {/* <div className="slider__indicator">
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
        </div> */}
      </div>
      <div className="slider__controller">
        <img src={Right} alt="Right" onClick={handleButtonClick} id="right" />
      </div>
    </div>
  );
};

export default Images;
