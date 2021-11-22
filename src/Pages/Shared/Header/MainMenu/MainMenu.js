import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuthContexts from '../../../../hooks/useAuthContexts';

const MainMenu = () => {
	const { user } = useAuthContexts();

	// nav link active style
	const navLinkActiveStyle = {
		color: 'var(--clr-primary-dark)',
	};

	return (
		<ul className="h-full flex flex-col md:flex-row md:items-center md:justify-end md:pl-4 space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 font-my-title uppercase font-medium text-xl md:text-sm lg:text-base text-gray-300 md:text-my-dark-gray tracking-wide md:tracking-wide lg:tracking-my-tiny">
			<li>
				<NavLink
					to="/home"
					activeStyle={navLinkActiveStyle}
					className="hover:text-my-primary"
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/all-products"
					activeStyle={navLinkActiveStyle}
					className="hover:text-my-primary"
				>
					All Products
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/all-blogs"
					activeStyle={navLinkActiveStyle}
					className="hover:text-my-primary"
				>
					All Blogs
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/contact"
					activeStyle={navLinkActiveStyle}
					className="hover:text-my-primary"
				>
					Contact
				</NavLink>
			</li>
			{user.email && (
				<li>
					<NavLink
						to="/dashboard"
						activeStyle={navLinkActiveStyle}
						className="hover:text-my-primary"
					>
						Dashboard
					</NavLink>
				</li>
			)}
		</ul>
	);
};

export default MainMenu;
