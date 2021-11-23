import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import AOS from 'aos';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

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
		// check if within base products
		// if (index < 10) {
		// 	MySwal.fire({
		// 		icon: 'warning',
		// 		title: `Not allowed!`,
		// 		html: `<p class="text-sm">Sorry, this product can't be deleted. Base product.</p>`,
		// 		confirmButtonText: `OK`,
		// 		buttonsStyling: false,
		// 		customClass: {
		// 			confirmButton: 'btn-regular py-2',
		// 		},
		// 	});
		// 	return;
		// }

		// check if minimum products number reached
		if (!isEnoughProducts) {
			MySwal.fire({
				icon: 'warning',
				title: `Attention!`,
				html: `<p class="text-sm">Minimum products limit reached. <br />Add more product before performing this action.</p>`,
				confirmButtonText: `OK`,
				buttonsStyling: false,
				customClass: {
					confirmButton: 'btn-regular py-2',
				},
			});
			return;
		}

		// process remove product
		MySwal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			html: `<span class="text-sm">Product will be removed permanently.</span>`,
			confirmButtonText: 'Yes, delete',
			showCancelButton: true,
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn-regular bg-red-500 py-2 mr-4',
				cancelButton: 'btn-regular py-2'
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const url = `https://sheltered-caverns-44637.herokuapp.com/products/${id}`;
				axios
				.delete(url)
				.then(res => {
					console.log(res);
					if (res.data.deletedCount) {
						const remaining = products.filter(product => product._id !== id);
						setProducts(remaining);
					}
				})
				.catch(error => console.log(error));
			}
		});
	};

	// initialize aos plugin
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div 
			className="single-product-block bg-gray-100 group flex flex-nowrap justify-between lg:max-w-lg"
			data-aos="fade-up" 
			data-aos-duration="700" 
			data-aos-delay={`${index * 100 + 50}`}
			data-aos-once="true"
			data-aos-anchor-placement="top-bottom"
		>
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