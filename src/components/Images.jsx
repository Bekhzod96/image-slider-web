import React from 'react';
import images from '../assets/img/data';

const Images = () => {
  const [container, setContainer] = React.useState({});

  React.useEffect(() => {
    setContainer(document.querySelector('.container'));
    window.addEventListener('resize', size, false);
    console.log(images.length);
    return () => '';
  }, []);

  const item = images.length;
  let i = 0,
    x0 = null,
    locked = false,
    width;

  const unify = (e) => {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  const lock = (e) => {
    x0 = unify(e).clientX;
    container.classList.toggle('smooth', !(locked = true));
  };

  const drag = (e) => {
    e.preventDefault();

    if (locked)
      container.style.setProperty(
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
        container.style.setProperty('--i', (i -= s));
        f = 1 - f;
      }

      container.style.setProperty('--tx', '0px');
      container.style.setProperty('--f', f);
      container.classList.toggle('smooth', !(locked = false));
      x0 = null;
    }
  };

  const size = () => {
    width = window.innerWidth;
  };
  size();
  return (
    <div
      className='container'
      onMouseUp={move}
      onTouchEnd={move}
      onTouchStart={lock}
      onMouseDown={lock}
      onMouseMove={drag}
      onTouchMove={drag}
    >
      {images.map((imgUrl, index) => (
        <img src={imgUrl} alt='Error' key={index} />
      ))}
    </div>
  );
};

export default Images;
