import React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
	return (
		<ul>
			<li>
				<NavLink to="/home">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/all-products">
					All Products
				</NavLink>
			</li>
		</ul>
	);
};

export default MainMenu;