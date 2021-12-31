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
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const Home = () => {
	const { isLoading } = useAuthContexts();

	return (
		<>
			<HeaderNavbar />
			<Banner />
			<Products />
			<Reviews />
			<Blogs />
			{/* <PopularBrands /> */}
			<Footer />
			{isLoading && <LoadingStatus classes="fixed w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-highest" />}
		</>
	);
};

export default Home;