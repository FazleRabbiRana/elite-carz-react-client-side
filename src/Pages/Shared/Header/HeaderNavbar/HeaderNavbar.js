import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../../logo.svg';
import MainMenu from '../MainMenu/MainMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

const HeaderNavbar = () => {
	return (
		<header id="header_main" className="navbar h-16 md:h-20 py-1 flex items-center absolute top-0 left-0 w-full z-30 bg-white">
			<div className="container flex justify-between relative">
				<div className="logo-wrapper flex-shrink-0 w-28 md:w-36">
					<Link to="/home">
						<img src={logo} alt="Elite Carz logo" className="w-full" />
					</Link>
				</div>
				<div className="flex-shrink-0 md:ml-12 h-100 border-l border-r px-2 md:px-4 text-center flex flex-col justify-center font-my-title uppercase font-medium">
					<NavLink to="/login">
						Login
					</NavLink>
				</div>
				<div className="hidden md:block flex-grow">
					<MainMenu />
				</div>
				<div className="md:hidden inline-flex items-center">
					<MobileMenu />
				</div>
			</div>
		</header>
	);
};

export default HeaderNavbar;