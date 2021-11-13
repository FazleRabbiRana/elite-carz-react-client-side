import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContexts from '../../../hooks/useAuthContexts';
import ManageOrderItem from '../ManageOrderItem/ManageOrderItem';

const ManageAllOrders = () => {
	const [orders, setOrders] = useState([]);
	const { user } = useAuthContexts();

	// load all orders by email
	useEffect(() => {
		const url = `https://sheltered-caverns-44637.herokuapp.com/orders`;
		axios
			.get(url)
			.then(res => {
				// console.log(res.data);
				setOrders(res.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<section id="manage_all_orders" className="manage-all-orders">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">Manage All Orders</h3>
			<div className="orders-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-10 sm:gap-x-4 md:gap-y-6">
				{
					orders.map(order => <ManageOrderItem 
						key={order._id}
						order={order}
						orders={orders}
						setOrders={setOrders}
					/>)
				}
			</div>
		</section>
	);
};

export default ManageAllOrders;