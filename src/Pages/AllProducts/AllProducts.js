import React from 'react';
import Footer from '../Shared/Footer/Footer';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';

const AllProducts = () => {
	return (
		<>
			<HeaderNavbar />
			<main id="all_products_page" className="all-products-page pt-16 md:pt-20">
				<section id="all_products" className="py-8 lg:-py-12">
					<div className="container">
						all products page
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default AllProducts;