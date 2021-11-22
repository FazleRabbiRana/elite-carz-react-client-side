import React from 'react';
import { Link } from 'react-router-dom';
import { RiTimerFlashLine } from 'react-icons/ri';
import { MdOutlineElectricCar, MdOutlineSpeed } from 'react-icons/md';

const ProductCard = ({ product, index }) => {
	const { _id, name, brandName, image, price, specs } = product;

	return (
		<div 
			className="product-card bg-white h-full flex flex-col relative text-center font-my-title group"
			data-aos="fade-up" 
			data-aos-duration="700" 
			data-aos-delay={`${index * 100 + 50}`}
			data-aos-once="true"
			data-aos-anchor-placement="top-bottom"
		>
			<div className="image overflow-hidden relative">
				<img
					src={image}
					alt={name}
					className="w-full object-cover object-center transform duration-500 group-hover:scale-125"
				/>
				<h3 className="inline-block uppercase font-semibold text-sm leading-none py-1 px-4 bg-my-secondary text-white absolute bottom-0 left-0">
					{brandName}
				</h3>
			</div>
			<div className="flex-auto px-3 lg:px-4 py-2 border-l border-r">
				<h4 className="text-xl font-semibold">{name}</h4>
				<div className="flex flex-nowrap justify-evenly space-x-4 border-t border-b my-2 py-2 text-sm">
					<div title="horsepower">
						<span>
							<MdOutlineElectricCar className="mx-auto text-xl text-my-primary-dark" />
						</span>
						<p>{specs.horsepower}hp</p>
					</div>
					<div title="acceleration">
						<span>
							<RiTimerFlashLine className="mx-auto text-xl text-my-primary-dark" />
						</span>
						<p>{specs.acceleration}s</p>
					</div>
					<div title="top speed">
						<span>
							<MdOutlineSpeed className="mx-auto text-xl text-my-primary-dark" />
						</span>
						<p>{specs.topSpeed}mph</p>
					</div>
				</div>
				<h3 className="text-2xl">&#36;{price}</h3>
			</div>
			<Link to={`/product/${_id}`} className="btn-regular w-full">
				View Details
			</Link>
		</div>
	);
};

export default ProductCard;
