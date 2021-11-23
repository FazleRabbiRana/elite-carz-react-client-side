import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const ManageProduct = ({ product, products, setProducts, index }) => {
	const { _id, name, image, price } = product;
	const [isEnoughProducts, setIsEnoughProducts] = useState(true);

	// count products
	useEffect(() => {
		if (products.length <= 12) {
			setIsEnoughProducts(false);
		}
	}, [products.length]);

	// handle remove product
	const handleRemoveProduct = id => {
		if (index < 10) {
			alert('Sorry, this product can\'t be deleted. Base product.');
			return;
		}
		if (!isEnoughProducts) {
			alert('Sorry, minimum products limit reached.\nAdd more product to perform this action.');
			return;
		}

		const proceed = window.confirm('Will be removed from Database. \nProceed?');
		const url = `https://sheltered-caverns-44637.herokuapp.com/products/${id}`;
		if (proceed) {
			axios
				.delete(url)
				.then(res => {
					console.log(res);
					if (res.data.deletedCount) {
						const remaining = products.filter(product => product._id !== id);
						setProducts(remaining);
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	return (
		<div className="single-product-block bg-gray-100 group flex flex-nowrap justify-between lg:max-w-lg">
			<div className="image flex-shrink-0 w-16 sm:w-28 md:w-36 overflow-hidden">
				<img src={image} alt={name} className="w-full h-full object-cover object-center" />
			</div>
			<div className="flex-grow flex flex-col justify-center p-2 font-my-title">
				<h4 className="font-normal text-sm tracking-normal md:text-lg">{name}</h4>
				<p className="text-sm md:text-base">&#36;{price}</p>
			</div>
			<div className="flex-shrink-0 flex items-center">
				<button 
					onClick={() => handleRemoveProduct(_id)} 
					className={`m-1 md:m-2 ${(!isEnoughProducts || index < 10) && 'opacity-50'}`}
					// disabled={isEnoughProducts ? false : true}
				>
					<RiCloseCircleLine className="text-2xl text-red-500 hover:text-red-700" />
				</button>
			</div>
		</div>
	);
};

export default ManageProduct;