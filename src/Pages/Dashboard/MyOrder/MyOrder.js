import axios from 'axios';
import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const MyOrder = ({ order, orders, setOrders }) => {
	const { name, image, price } = order?.orderedProduct;

	// handle remove order
	const handleRemoveOrder = id => {
		const proceed = window.confirm('Will be removed from Database. \nProceed?');
		const url = `https://sheltered-caverns-44637.herokuapp.com/orders/${id}`;
		if (proceed) {
			axios
				.delete(url)
				.then(res => {
					console.log(res);
					if (res.data.deletedCount) {
						const remaining = orders.filter(order => order._id !== id);
						setOrders(remaining);
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	return (
		<div className="single-order-block bg-gray-100 group flex flex-nowrap justify-between lg:max-w-lg">
			<div className="image flex-shrink-0 w-20 sm:w-28 md:w-36 overflow-hidden">
				<img src={image} alt={name} className="w-full h-full object-cover object-center" />
			</div>
			<div className="flex-grow py-1 px-2 font-my-title text-sm md:text-base">
				<h4 className="font-normal text-base md:text-lg">{name}</h4>
				<p className="sm:block">&#36;{price}</p>
				<p className="sm:block">Status: {order?.status}</p>
			</div>
			<div className="flex-shrink-0 flex items-center">
				<button onClick={() => handleRemoveOrder(order._id)} className="m-1 md:m-2">
					<RiCloseCircleLine className="text-2xl text-red-500 hover:text-red-700" />
				</button>
			</div>
		</div>
	);
};

export default MyOrder;
