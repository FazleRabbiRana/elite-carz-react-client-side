import React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
	return (
		<ul className="h-full flex flex-col md:flex-row md:items-center md:justify-end md:pl-4 space-y-2 md:space-y-0 md:space-x-8 font-my-title uppercase font-semibold text-xl md:text-base text-gray-300 md:text-my-dark-gray tracking-wide md:tracking-my-tiny">
			<li>
				<NavLink to="/home" className="hover:text-my-primary-dark">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/all-products" className="hover:text-my-primary-dark">
					All Products
				</NavLink>
			</li>
		</ul>
	);
};

export default MainMenu;