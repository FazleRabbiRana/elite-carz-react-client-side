import React, { useState } from 'react';
import useAuthContexts from '../../../hooks/useAuthContexts';
import { useForm } from "react-hook-form";
import { RiAsterisk } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<div className="place-order bg-white shadow-my-around p-4">
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
						Pickup address{' '}
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
					{orderSuccess && <h5 className="mb-3 text-green-600 text-xl">Order successful!</h5>}
					<input type="submit" className="btn-regular" value="Place Order" />
				</div>
    	</form>
			{orderSuccess && (
				<div className="mt-4 flex flex-nowrap space-x-6 font-my-title text-true-gray-800">
					<Link to="/home" className="underline hover:text-my-primary-dark">Home</Link>
					<Link to="/all-products" className="underline hover:text-my-primary-dark">More Cars</Link>
				</div>
			)}
		</div>
	);
};

export default PlaceOrder;