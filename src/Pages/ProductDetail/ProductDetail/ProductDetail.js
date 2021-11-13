import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import Footer from '../../Shared/Footer/Footer';
import HeaderNavbar from '../../Shared/Header/HeaderNavbar/HeaderNavbar';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import ProductDetailInfo from '../ProductDetailInfo/ProductDetailInfo';

const ProductDetail = () => {
	let { productId } = useParams();
	const [product, setProduct] = useState({});
	const { setIsLoading } = useAuthContexts();
	const { name, brandName, price } = product;

	// load product detail with id
	useEffect(() => {
		const url = `https://sheltered-caverns-44637.herokuapp.com/products/${productId}`;
		axios
			.get(url)
			.then(res => {
				// console.log(res.data);
				setProduct(res.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [productId, setIsLoading]);

	return (
		<>
			<HeaderNavbar />
			<main id="product_detail_page" className="product-detail-page pt-16 md:pt-20">
				<section id="product_detail" className="product-detail py-8 lg:py-12 bg-my-yellow-cream">
					<div className="container">
						<div className="sm:flex sm:justify-between sm:items-start space-y-4 sm:space-y-0 mb-8">
							<h2 className="text-3xl">
								{name}<br /> 
								<span className="text-lg">Brand: <span className="font-bold">{brandName}</span></span>
							</h2>
							<h3 className="inline-flex flex-nowrap bg-my-secondary text-white font-semibold text-2xl">
								<span className="px-3 py-1 border-r">&#36;</span>
								<span className="px-4 py-1">{price}</span>
							</h3>
						</div>
						<div className="md:flex md:justify-between md:space-x-4 xl:space-x-8 space-y-10 md:space-y-0">
							<div className="flex-grow-1 xl:max-w-screen-lg">
								<ProductDetailInfo product={product} />
							</div>
							<div className="flex-shrink-0 md:w-64 lg:w-80">
								<PlaceOrder product={product} />
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default ProductDetail;