import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContexts from '../../../hooks/useAuthContexts';
import ManageProduct from '../ManageProduct/ManageProduct';

const ManageProducts = () => {
	const [products, setProducts] = useState([]);
	const [isEnoughProducts, setIsEnoughProducts] = useState(true);
	const { user } = useAuthContexts();

	// load all products by email
	useEffect(() => {
		const url = `https://sheltered-caverns-44637.herokuapp.com/products`;
		axios
			.get(url)
			.then(res => {
				// console.log(res.data);
				setProducts(res.data);
				if (res.data.length < 6) {
					setIsEnoughProducts(false);
				} 
			})
			.catch(error => {
				console.log(error);
			});
	}, [user.email]);

	return (
		<section id="my_products" className="my-products">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">Manage Products</h3>
			<div className="products-wrapper flex flex-col space-y-4">
				{
					products.map(product => <ManageProduct 
						key={product._id}
						product={product}
						products={products}
						setProducts={setProducts}
						isEnoughProducts={isEnoughProducts}
					/>)
				}
			</div>
		</section>
	);
};

export default ManageProducts;