import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
	const [orders, setOrders] = useState([]);
	const [processing, setProcessing] = useState(false);
	const { user } = useAuthContexts();

	// load all orders by email 
	useEffect(() => {
		setProcessing(true);
		const url = `https://sheltered-caverns-44637.herokuapp.com/orders?email=${user.email}`;
		axios
			.get(url)
			.then(res => {
				// console.log(res.data);
				setOrders(res.data);
			})
			.catch(err => console.log(err))
			.finally(() => setProcessing(false));
	}, [user.email]);

	return (
		<section id="my_orders" className="my-orders">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">
				My Orders <span className="text-gray-400">{orders?.length}</span>
			</h3>
			{processing && <LoadingStatus />}
			<div className="orders-wrapper flex flex-col space-y-4">
				{
					orders.map((order, index) => <MyOrder 
						key={order._id}
						order={order}
						orders={orders}
						setOrders={setOrders}
						index={index}
					/>)
				}
			</div>
		</section>
	);
};

export default MyOrders;