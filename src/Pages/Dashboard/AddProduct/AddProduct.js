import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk } from 'react-icons/ri';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const AddProduct = () => {
	// product default values
	const defaultValues = {
		name: 'Cayman 718',
		brandName: 'Porsche',
		image: 'https://i.ibb.co/ggPgJSB/black-porsche-cayman.jpg',
		price: '104000',
		description:
			"The 2021 Porsche 718 Cayman captures the same physical and emotional excitement of driving that supercars do. The Cayman's otherworldly chassis provides an open line of communication between the driver, the car, and the road. To create the 718, Porsche knits together strong brakes, an unflappable suspension, and a steering system rich with feedback.",
		specs: {
			color: 'Black',
			engine: '2.7-liter DOHC 24-valve flat-6',
			horsepower: '414',
			acceleration: '3.3',
			topSpeed: '188',
		},
	};

	// add new product on form submit
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues });

	const onSubmit = data => {
		// console.log(data);
		// axios
		// 	.post('https://sheltered-caverns-44637.herokuapp.com/products', data)
		// 	.then(res => {
		// 		// console.log(res);
		// 		if (res.data.insertedId) {
		// 			reset();
		// 			MySwal.fire({
		// 				icon: 'success',
		// 				title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Product ADDED successfully!</span>`,
		// 				confirmButtonText: `OK`,
		// 				buttonsStyling: false,
		// 				customClass: {
		// 					confirmButton: 'btn-regular py-2',
		// 				},
		// 			});
		// 		}
		// 	})
		// 	.catch(err => console.log(err));

		MySwal.fire({
			icon: 'warning',
			title: ``,
			html: `<span class="inline-block font-medium text-sm">For security purpose add product system is disabled currently.</span>`,
			confirmButtonText: `OK`,
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn-regular py-2',
			},
		});
	};

	return (
		<section id="add_product" className="add-product">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">
				Add a Product
			</h3>
			<div className="max-w-lg">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-4"
				>
					<div>
						<label className="block mb-1">
							Product name{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<input
							className="form-field"
							{...register('name', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Brand name{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<input
							className="form-field"
							{...register('brandName', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Product Image{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<input
							className="form-field"
							{...register('image', { required: true })}
						/>
						<span className="text-xs text-gray-400 px-2">
							Recommended image ratio 16:9, size 1024x576
						</span>
					</div>
					<div>
						<label className="block mb-1">
							Price{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />{' '}
							<span className="opacity-70 text-sm">(in USD)</span>
						</label>
						<input
							type="number"
							min="1"
							className="form-field"
							{...register('price', { required: true, min: 1 })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Description{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<textarea
							className="form-field h-36 py-2"
							{...register('description', { required: true })}
						></textarea>
					</div>
					<div>
						<label className="block mb-1">
							Color{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<input
							className="form-field"
							{...register('specs.color', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Engine capacity-type{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<input
							className="form-field"
							{...register('specs.engine', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Horsepower{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
							<span className="opacity-70 text-sm">(in HP)</span>
						</label>
						<input
							className="form-field"
							{...register('specs.horsepower', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Acceleration{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
							<span className="opacity-70 text-sm">(in Seconds)</span>
						</label>
						<input
							className="form-field"
							{...register('specs.acceleration', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Top speed{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
							<span className="opacity-70 text-sm">(in MPH)</span>
						</label>
						<input
							className="form-field"
							{...register('specs.topSpeed', { required: true })}
						/>
					</div>
					<div className="mt-6">
						{(errors.name ||
							errors.brandName ||
							errors.image ||
							errors.price ||
							errors.description ||
							errors.specs?.color ||
							errors.specs?.engine ||
							errors.specs?.horsepower ||
							errors.specs?.acceleration ||
							errors.specs?.topSpeed) && (
							<p className="text-sm text-red-600 leading-loose">
								Please fill up every field properly.
							</p>
						)}
						<input
							type="submit"
							value="Add Product"
							className="btn-regular text-sm leading-none px-4 sm:px-6 mr-4"
						/>
						<input
							type="reset"
							value="Clear fields"
							className="btn-regular bg-my-secondary-light text-sm leading-none px-4 sm:px-6"
						/>
					</div>
				</form>
				<div className="status">
					<p className="mt-4 text-sm text-gray-400 text-my-primary-dark">
						For security purpose add product system is disabled currently.{' '}
					</p>
					{/* <p className="mt-4 text-sm text-gray-400">
						For more product info{' '}
						<a
							href="https://github.com/FazleRabbiRana?tab=repositories"
							target="_blank"
							rel="noreferrer"
							className="text-blue-500 underline hover:text-blue-700"
						>
							Click here
						</a>
					</p> */}
				</div>
			</div>
		</section>
	);
};

export default AddProduct;
