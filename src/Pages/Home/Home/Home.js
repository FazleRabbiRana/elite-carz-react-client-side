import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import HeaderNavbar from '../../Shared/Header/HeaderNavbar/HeaderNavbar';
import Banner from '../Banner/Banner';
import Blogs from '../Blogs/Blogs';
import Reviews from '../Reviews/Reviews';

const Home = () => {
	return (
		<>
			<HeaderNavbar />
			<Banner />
			<Reviews />
			<Blogs />
			<Footer />
		</>
	);
};

export default Home;