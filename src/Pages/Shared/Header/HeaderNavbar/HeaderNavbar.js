import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../../logo.svg';
import MainMenu from '../MainMenu/MainMenu';

const HeaderNavbar = () => {
	return (
		<header id="header_main" className="navbar py-3 sm:py-4 lg:py-6">
			<div className="container">
				<div className="logo-wrapper flex-shrink-0 w-28 md:w-36">
					<Link to="/home">
						<img src={logo} alt="Elite Carz logo" className="w-full" />
					</Link>
				</div>
				<div>
					<NavLink to="/login">
						Login
					</NavLink>
				</div>
				<div>
					<MainMenu />
				</div>
			</div>
		</header>
	);
};

export default HeaderNavbar;