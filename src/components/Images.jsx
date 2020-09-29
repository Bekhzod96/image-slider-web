import React, { useRef, useState, useEffect } from 'react';
import images from '../assets/img/data';
import Left from '../assets/img/left.png';
import Right from '../assets/img/right.png';

const Images = () => {
	const [width, setWidth] = useState(window.innerWidth),
		imgRef = useRef(null),
		item = images.length;
	let i = 0,
		touchstartx = null,
		locked = false;

	useEffect(() => {
		imgRef.current.style.setProperty('--n', item);
		return () => '';
	}, [item]);

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

			if ((i > 0 || s < 0) && (i < item - 1 || s > 0) && f > 0.2) {
				imgRef.current.style.setProperty('--i', (i -= s));
				f = 1 - f;
			}
			animate(f);
		}
	};

	const handleButtonClick = (e) => {
		let direction = 0;
		if (e.target.id === 'right' && i < item - 1) direction += 1;

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
		<div className="shadow">
			<div className="controller">
				<img src={Left} alt="Left" onClick={handleButtonClick} id="left" />
			</div>
			<div className="slider-wrap">
				<div
					className="container"
					onMouseUp={move}
					onTouchEnd={move}
					onMouseDown={lock}
					onTouchStart={lock}
					onMouseMove={drag}
					onTouchMove={drag}
					ref={imgRef}
				>
					{images.map((imgUrl, index) => (
						<img src={imgUrl} alt="Error" key={index} />
					))}
				</div>
				<div className="indicator">
					{images.map((img, index) => (
						<div
							className="dot"
							onClick={handleIndicatorClick}
							key={index}
							id={index}
						>
							{' '}
						</div>
					))}
				</div>
			</div>
			<div className="controller">
				<img src={Right} alt="Right" onClick={handleButtonClick} id="right" />
			</div>
		</div>
	);
};

export default Images;
