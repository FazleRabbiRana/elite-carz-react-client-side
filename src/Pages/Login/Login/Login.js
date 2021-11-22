import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import HeaderNavbar from '../../Shared/Header/HeaderNavbar/HeaderNavbar';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const Login = () => {
	return (
		<>
			<HeaderNavbar />
			<main id="login_page" className="login-page pt-16 md:pt-20">
				<section className="py-8 lg:py-12 relative">
					<div className="px-4 md:flex lg:justify-evenly space-y-8 md:space-y-0 md:space-x-6 lg:space-x-12 xl:max-w-screen-xl xl:mx-auto">
						<div className="md:w-1/2 lg:max-w-sm">
							<LoginForm />
						</div>
						<div 
							className="flex-shrink-0 h-10 w-10 rounded-full bg-my-primary text-true-gray-800 font-semibold flex items-center justify-center text-center mx-auto"
							data-aos="fade-down" 
							data-aos-duration="500" 
							data-aos-delay="300"
							data-aos-once="false"
						>
							Or
						</div>
						<div className="md:w-1/2 lg:max-w-sm">
							<RegisterForm />
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Login;
