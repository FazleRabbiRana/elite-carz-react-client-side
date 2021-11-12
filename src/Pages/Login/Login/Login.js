import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../logo.svg';

const Login = () => {
	return (
		<main id="login_page" className="login-page py-8 lg:py-12">
			<header>
				<div className="logo-wrapper w-28 md:w-36 mx-auto">
					<Link to="/home" title="Elite Carz Home">
						<img src={logo} alt="Elite Carz logo" className="w-full" />
					</Link>
				</div>
			</header>
			<section className="py-8 lg:py-12">
				<div className="container">This is Login page</div>
			</section>
		</main>
	);
};

export default Login;
