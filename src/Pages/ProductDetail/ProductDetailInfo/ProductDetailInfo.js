import React from 'react';
import { RiTimerFlashLine } from 'react-icons/ri';
import { MdOutlineElectricCar, MdOutlineSpeed } from 'react-icons/md';

const ProductDetailInfo = ({ product }) => {
	const { name, image, description, specs } = product;

	return (
		<div className="product-detail-info">
			<div className="image">
				<img src={image} alt={name} className="w-full object-cover object-center" />
			</div>
			<div className="bg-white py-4 px-2 sm:p-4 flex flex-nowrap justify-evenly text-center space-x-4 border-t border-b my-4 font-my-title text-lg">
				<div title="horsepower">
					<p className="uppercase font-semibold text-xs text-true-gray-800 mb-2">Horsepower</p>
					<span>
						<MdOutlineElectricCar className="mx-auto text-5xl text-my-primary" />
					</span>
					<p className="mt-1">
						<span className="text-3xl text-true-gray-800">
							{specs?.horsepower}
						</span>
						hp
					</p>
				</div>
				<div title="acceleration">
					<p className="uppercase font-semibold text-xs text-true-gray-800 mb-2">Acceleration</p>
					<span>
						<RiTimerFlashLine className="mx-auto text-5xl text-my-primary" />
					</span>
					<p className="mt-1">
						<span className="text-3xl text-true-gray-800">
							{specs?.acceleration}
						</span>
						s
					</p>
				</div>
				<div title="top speed">
					<p className="uppercase font-semibold text-xs text-true-gray-800 mb-2">Top Speed</p>
					<span>
						<MdOutlineSpeed className="mx-auto text-5xl text-my-primary" />
					</span>
					<p className="mt-1">
						<span className="text-3xl text-true-gray-800">
							{specs?.topSpeed}
						</span>
						mph
					</p>
				</div>
			</div>
			<div className="about mt-6">
				<h4 className="text-xl tracking-normal font-semibold mb-3">More About this car</h4>
				<p className="text-sm">Color: <span className="font-medium text-true-gray-800">{specs?.color}</span></p>
				<p className="mt-3 text-sm leading-relaxed">{description}</p>
			</div>
		</div>
	);
};

export default ProductDetailInfo;
