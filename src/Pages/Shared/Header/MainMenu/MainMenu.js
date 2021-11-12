import React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
	const navLinkActiveStyle = {
		color: 'var(--clr-primary-dark)'
	}

	return (
		<ul className="h-full flex flex-col md:flex-row md:items-center md:justify-end md:pl-4 space-y-2 md:space-y-0 md:space-x-8 font-my-title uppercase font-semibold text-xl md:text-base text-gray-300 md:text-my-dark-gray tracking-wide md:tracking-my-tiny">
			<li>
				<NavLink to="/home" activeStyle={navLinkActiveStyle} className="hover:text-my-primary">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/all-products" activeStyle={navLinkActiveStyle} className="hover:text-my-primary">
					All Products
				</NavLink>
			</li>
			<li>
				<NavLink to="/all-blogs" activeStyle={navLinkActiveStyle} className="hover:text-my-primary">
					All Blogs
				</NavLink>
			</li>
			<li>
				<NavLink to="/dashboard" activeStyle={navLinkActiveStyle} className="hover:text-my-primary">
					Dashboard
				</NavLink>
			</li>
		</ul>
	);
};

export default MainMenu;