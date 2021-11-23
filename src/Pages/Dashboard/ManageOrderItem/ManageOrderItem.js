import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AOS from 'aos';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const ManageOrderItem = ({ order, orders, setOrders, index }) => {
	const { name, image } = order?.orderedProduct;
	const { register, handleSubmit } = useForm();
	const [success, setSuccess] = useState(false);
	const [newStatus, setNewStatus] = useState('');

	// update order status
	const onSubmit = data => {
		// console.log(data);
		const changedStatus = data.status;
		// return if no option selected
		if (changedStatus === '') {
			return;
		}
		// process update/change order status
		const updatedOrder = {...order}
		updatedOrder.status = changedStatus;
		const url = `https://sheltered-caverns-44637.herokuapp.com/orders/${order._id}`;
		axios
			.put(url, updatedOrder)
			.then(res => {
				if (res.data.modifiedCount) {
					setSuccess(true);
					setNewStatus(changedStatus);
					MySwal.fire({
						icon: 'success',
						title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Order status changed to <span class="uppercase">${changedStatus}</span>!</span>`,
						confirmButtonText: `OK`,
						buttonsStyling: false,
						customClass: {
							confirmButton: 'btn-regular py-2',
						},
					});
				}
			})
			.catch(err => console.log(err));
	};

	// handle remove order
	const handleRemoveOrder = id => {
		MySwal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			html: `<span class="text-sm">You won't be able to revert this!</span>`,
			confirmButtonText: 'Yes, delete',
			showCancelButton: true,
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn-regular bg-red-500 py-2 mr-4',
				cancelButton: 'btn-regular py-2'
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const url = `https://sheltered-caverns-44637.herokuapp.com/orders/${id}`;
				axios
				.delete(url)
				.then(res => {
					console.log(res);
					if (res.data.deletedCount) {
						const remaining = orders.filter(order => order._id !== id);
						setOrders(remaining);
						MySwal.fire({
							icon: 'success',
							title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Order DELETED successfully!</span>`,
							confirmButtonText: `OK`,
							buttonsStyling: false,
							customClass: {
								confirmButton: 'btn-regular py-2',
							},
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
			}
		});
	};

	// initialize aos plugin
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div 
			className="single-order-block bg-gray-100 group md:flex md:flex-nowrap lg:max-w-screen-lg"
			data-aos="fade-up" 
			data-aos-duration="700" 
			data-aos-delay={`${index * 100 + 50}`}
			data-aos-once="true"
			data-aos-anchor-placement="top-bottom"
		>
			<div className="image md:flex-shrink-0 overflow-hidden md:w-32 lg:w-48 xl:w-56">
				<img
					src={image}
					alt={name}
					className="w-full h-full object-cover object-center transform duration-500 group-hover:scale-125"
				/>
			</div>
			<div className="px-2 lg:px-4 pt-2 pb-4 md:py-4 md:flex-grow md:flex md:flex-nowrap">
				<div className="flex-auto font-my-title">
					<h4 className="font-normal text-lg tracking-normal">{name}</h4>
					<p>Customer: <span className="text-true-gray-800 font-medium">{order.name}</span></p>
					<p>Ordered: <span className="text-true-gray-800 font-medium">{order.orderDate}</span></p>
					<p>Status: <span className="text-true-gray-800 font-medium">{success ? newStatus : order?.status}</span></p>
				</div>
				<div className="mt-3 md:mt-0 md:flex-shrink-0 text-center md:text-right">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-nowrap my-2 md:mt-0 md:mb-3">
						<select 
							className="form-field h-10 flex-grow" 
							{...register('status', { required: true })}
							defaultValue=""
						>
							<option value="" disabled hidden>Change Status</option>
							<option value="Shipped">Shipped</option>
							<option value="Pending">Pending</option>
						</select>
						<input type="submit" value="Change" className="flex-shrink-0 btn-regular text-sm px-4 py-1"
						/>
					</form>
					<button
						onClick={() => handleRemoveOrder(order._id)}
						className="btn-regular px-4 text-sm leading-none bg-red-500 hover:bg-red-600"
					>
						Remove Order
					</button>
				</div>
			</div>
		</div>
	);
};

export default ManageOrderItem;
