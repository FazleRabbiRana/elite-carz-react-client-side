import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContexts from '../../../hooks/useAuthContexts';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
	const [orders, setOrders] = useState([]);
	const { user } = useAuthContexts();

	// load all orders by email
	useEffect(() => {
		const url = `https://sheltered-caverns-44637.herokuapp.com/orders?email=${user.email}`;
		axios
			.get(url)
			.then(res => {
				// console.log(res.data);
				setOrders(res.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [user.email]);

	return (
		<section id="my_orders" className="my-orders">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">My Orders</h3>
			<div className="orders-wrapper flex flex-col space-y-4">
				{
					orders.map(order => <MyOrder 
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

export default MyOrders;