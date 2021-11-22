import React from 'react';
import Footer from '../Shared/Footer/Footer';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';

const Contact = () => {
	return (
		<>
			<HeaderNavbar />
			<main id="contact_page" className="contact-page pt-16 md:pt-20">
				<section className="py-8 lg:py-12">
					<div className="container">
						Contact
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Contact;