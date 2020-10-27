import React from 'react';

const Slides = () => {
  return (
    <>
      {/* ChildNode #1  */}
      <div key="1" className="slider__slide">
        <img
          src="https://cdn.pixabay.com/photo/2020/09/19/15/43/townscape-5584820_960_720.jpg"
          alt="Error"
          width="100%"
          height="100%"
        />
      </div>
      {/* ChildNode #2  */}
      <div key="2" className="slider__slide quote">
        <h1>
          follow excellence... <br /> success will chase you
        </h1>
      </div>
      {/* ChildNode #3  */}
      <div key="3" className="slider__slide">
        <img
          src="https://cdn.pixabay.com/photo/2020/02/01/12/47/door-4810233_960_720.jpg"
          width="100%"
          height="100%"
          alt="Error"
        />
      </div>
      {/* ChildNode #4  */}
      <div key="4" className="slider__slide">
        <img
          src="https://cdn.pixabay.com/photo/2020/04/04/13/41/corona-5002341_960_720.jpg"
          alt="Error"
          width="100%"
          height="100%"
        />
      </div>
      {/* ChildNode #5  */}
      <div key="5" className="slider__slide">
        <img
          src="https://cdn.pixabay.com/photo/2020/08/12/09/42/dog-5482171_960_720.jpg"
          alt="Error"
          width="100%"
          height="100%"
        />
      </div>
      {/* ChildNode #6  */}
      <div key="6" className="slider__slide">
        <img
          src="https://cdn.pixabay.com/photo/2020/08/27/10/24/water-5521696_960_720.jpg"
          alt="Error"
          width="100%"
          height="100%"
        />
      </div>
      {/* ChildNode #7  */}
      <div key="7" className="slider__slide quote">
        <h1>
          follow excellence... <br /> success will chase you
        </h1>
      </div>
    </>
  );
};

export default Slides;
