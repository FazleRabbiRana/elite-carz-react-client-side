import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import Footer from '../../Shared/Footer/Footer';
import HeaderNavbar from '../../Shared/Header/HeaderNavbar/HeaderNavbar';
import Banner from '../Banner/Banner';
import Blogs from '../Blogs/Blogs';
// import PopularBrands from '../PopularBrands/PopularBrands';
import Products from '../Products/Products';
import Reviews from '../Reviews/Reviews';

const Home = () => {
	return (
		<>
			<HeaderNavbar />
			<Banner />
			<Products />
			<Reviews />
			<Blogs />
			{/* <PopularBrands /> */}
			<Footer />
		</>
	);
};

export default Home;