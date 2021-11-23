import React, { useState } from 'react';
import useAuthContexts from '../../../hooks/useAuthContexts';
import { useForm } from "react-hook-form";
import { RiAsterisk } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const PlaceOrder = ({ product }) => {
	const { user } = useAuthContexts();
	const [orderSuccess, setOrderSuccess] = useState(false);
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	// place order on form submit
  const onSubmit = data => {
		data.orderedProduct = {...product};
		data.orderDate = new Date().toLocaleDateString();
		data.status = 'Pending';
		// console.log(data);
		axios
			.post('https://sheltered-caverns-44637.herokuapp.com/orders', data)
			.then(res => {
				if (res.data.insertedId) {
					setOrderSuccess(true);
					reset();
					MySwal.fire({
						icon: 'success',
						title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Order PLACED successfully!</span>`,
						confirmButtonText: `OK`,
						buttonsStyling: false,
						customClass: {
							confirmButton: 'btn-regular py-2',
						},
					});
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<div 
			className="place-order bg-white shadow-my-around p-4"
			data-aos="fade-up"
			data-aos-delay="100"
			data-aos-duration="700"
			data-aos-once="true"
			data-aos-anchor-placement="top-bottom"
		>
			<h3 className="text-2xl"><span className="font-semibold">Order</span> This Car</h3>
			<hr className="block leading-none w-14 border-my-primary my-4" />
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
				<div>
					<input 
						readOnly 
						defaultValue={user?.displayName} 
						{...register("name", { required: true })} 
						className="form-field"
					/>
				</div>
				<div>
					<input 
						readOnly 
						defaultValue={user?.email} 
						{...register("email", { required: true })} 
						className="form-field"
					/>
				</div>
				<div>
					<label className="block mb-1">Phone</label>
					<input 
						type="tel"
						{...register("phone")} 
						className="form-field"
					/>
				</div>
				<div>
					<label className="block mb-1">
						Shipping address{' '}
						<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<textarea 
						{...register("address", { required: true })} 
						className="form-field h-16"
					></textarea>
				</div>
      
      	<div>
					{(errors.name ||
						errors.email ||
						errors.address) && (
						<p className="text-sm text-red-600 leading-loose">
							Please Fill up the form properly.
						</p>
					)}
					<input type="submit" className="btn-regular" value="Place Order" />
				</div>
    	</form>
			{orderSuccess && (
				<div className="mt-4 flex flex-nowrap space-x-6 font-my-title text-true-gray-800">
					<Link to="/dashboard" className="underline hover:text-my-primary-dark">Dashboard</Link>
					<Link to="/all-products" className="underline hover:text-my-primary-dark">More Cars</Link>
				</div>
			)}
		</div>
	);
};

export default PlaceOrder;