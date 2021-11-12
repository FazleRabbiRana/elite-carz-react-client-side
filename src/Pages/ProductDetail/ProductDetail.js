import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuthContexts from '../../hooks/useAuthContexts';
import Footer from '../Shared/Footer/Footer';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';
import LoadingStatus from '../Shared/LoadingStatus/LoadingStatus';

const ProductDetail = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const { isLoading, setIsLoading } = useAuthContexts();

	// load product detail with id
	useEffect(() => {
		setIsLoading(true);
		const url = `https://sheltered-caverns-44637.herokuapp.com/products/${productId}`;
		axios
			.get(url)
			.then(res => {
				console.log(res.data);
				setProduct(res.data);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => setIsLoading(false));
	}, [productId]);

	return (
		<>
			<HeaderNavbar />
			<main id="product_detail_page" className="product-detail-page pt-16 md:pt-20">
				<section id="product_detail" className="product-detail py-8 lg:py-12">
					{isLoading && <LoadingStatus />}
					<div className="container">
						Product detail page {productId}
						<h3>{product?.name}</h3>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default ProductDetail;