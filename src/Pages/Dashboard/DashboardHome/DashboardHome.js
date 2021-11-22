import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContexts from '../../../hooks/useAuthContexts';

const DashboardHome = () => {
	const { user, isAdmin } = useAuthContexts();
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);
	const [pendingOrders, setPendingOrders] = useState([]);
	const [shippedOrders, setShippedOrders] = useState([]);
	const [maxRatings, setMaxRatings] = useState([]);

	// load products
	useEffect(() => {
		const url = `https://sheltered-caverns-44637.herokuapp.com/products`;
		axios
			.get(url)
			.then(res => {
				const products = res.data;
				setProducts(products);
			})
			.catch(error => console.log(error));
	}, []);

	// load orders
	useEffect(() => {
		let url = `https://sheltered-caverns-44637.herokuapp.com/orders?email=${user.email}`;
		if (isAdmin) {
			url = `https://sheltered-caverns-44637.herokuapp.com/orders`;
		}
		axios
			.get(url)
			.then(res => {
				const orders = res.data;
				setOrders(orders);
				const pending = orders.filter(order => order.status.toLowerCase() === 'pending');
				setPendingOrders(pending);
				const shipped = orders.filter(order => order.status.toLowerCase() === 'shipped');
				setShippedOrders(shipped);
			})
			.catch(error => console.log(error));
	}, [user.email, isAdmin]);

	// load reviews
	useEffect(() => {
		const url = `https://sheltered-caverns-44637.herokuapp.com/reviews`;
		axios
			.get(url)
			.then(res => {
				const reviews = res.data;
				const fiveStarRatings = reviews.filter(review => review.rating === '5');
				setMaxRatings(fiveStarRatings);
			})
	}, []);

	return (
		<section id="dashboard_home" className="dashboard-home">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">
				Welcome to Dashboard
			</h3>
			<div>
				<div className="text-true-gray-800 font-medium space-y-2 mb-6">
					<div>
						<span className="font-my-title text-lg text-gray-500">Name: </span>
						<span className="text-true-gray-800 font-medium">
							{user.displayName}
						</span>
					</div>
					<div>
						<span className="font-my-title text-lg text-gray-500">Email: </span>
						<span className="text-true-gray-800 font-medium">{user.email}</span>
					</div>
					<div>
						<span className="font-my-title text-lg text-gray-500">User Type: </span>
						<span className="text-true-gray-800 font-medium">
							{isAdmin ? 'Admin' : 'General'}
						</span>
					</div>
				</div>

				<div className="dashboard-summary max-w-sm space-y-6">
					{isAdmin && (
						<div className="flex flex-nowrap bg-my-primary text-white font-my-title uppercase font-semibold text-lg lg:text-xl leading-none tracking-wide lg:tracking-wider">
							<div className="flex-shrink-0 bg-my-secondary text-center w-16 lg:w-20 text-3xl lg:text-4xl leading-none lg:leading-none p-2">
								{products.length}
							</div>
							<div className="flex-grow px-4 flex flex-nowrap items-center">
								Total Product
							</div>
						</div>
					)}
					<div className="flex flex-nowrap bg-my-primary text-white font-my-title uppercase font-semibold text-lg lg:text-xl leading-none tracking-wide lg:tracking-wider">
						<div className="flex-shrink-0 bg-my-secondary text-center w-16 lg:w-20 text-3xl lg:text-4xl leading-none lg:leading-none p-2">
							{orders.length}
						</div>
						<div className="flex-grow px-4 flex flex-nowrap items-center">
							Total Order
						</div>
					</div>
					<div className="flex flex-nowrap bg-my-primary text-white font-my-title uppercase font-semibold text-lg lg:text-xl leading-none tracking-wide lg:tracking-wider">
						<div className="flex-shrink-0 bg-my-secondary text-center w-16 lg:w-20 text-3xl lg:text-4xl leading-none lg:leading-none p-2">
							{pendingOrders.length}
						</div>
						<div className="flex-grow px-4 flex flex-nowrap items-center">
							Pending Order
						</div>
					</div>
					<div className="flex flex-nowrap bg-my-primary text-white font-my-title uppercase font-semibold text-lg lg:text-xl leading-none tracking-wide lg:tracking-wider">
						<div className="flex-shrink-0 bg-my-secondary text-center w-16 lg:w-20 text-3xl lg:text-4xl leading-none lg:leading-none p-2">
							{shippedOrders.length}
						</div>
						<div className="flex-grow px-4 flex flex-nowrap items-center">
							Shipped Order
						</div>
					</div>
					{isAdmin && (
						<div className="flex flex-nowrap bg-my-primary text-white font-my-title uppercase font-semibold text-lg lg:text-xl leading-none tracking-wide lg:tracking-wider">
							<div className="flex-shrink-0 bg-my-secondary text-center w-16 lg:w-20 text-3xl lg:text-4xl leading-none lg:leading-none p-2">
								{maxRatings.length}
							</div>
							<div className="flex-grow px-4 flex flex-nowrap items-center">
								5 Star Rating
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default DashboardHome;