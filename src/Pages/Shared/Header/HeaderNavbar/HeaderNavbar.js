import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthContexts from '../../../../hooks/useAuthContexts';
import logo from '../../../../logo.svg';
import MainMenu from '../MainMenu/MainMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import { RiLock2Line } from 'react-icons/ri';

const HeaderNavbar = () => {
	const { user, logOut } = useAuthContexts();

	// nav link active style
	const navLinkActiveStyle = {
		color: 'var(--clr-primary-dark)'
	}

	return (
		<header id="header_main" className="navbar">
			<div className="container flex justify-between relative">
				<div className="logo-wrapper flex-shrink-0 w-28 md:w-36">
					<Link to="/home">
						<img src={logo} alt="Elite Carz logo" className="w-full" />
					</Link>
				</div>
				<div className="flex-shrink-0 md:ml-12 h-100 border-l border-r px-2 md:px-3 text-center flex flex-col justify-center font-my-title">
					{!user.email ? (
						<NavLink
							to="/login"
							activeStyle={navLinkActiveStyle}
							className="uppercase font-semibold text-base text-my-dark-gray hover:text-my-primary"
						>
							<RiLock2Line className="mx-auto text-my-primary" />
							Login
						</NavLink>
					) : (
						<div>
							<p className="normal-case text-true-gray-500 text-sm w-20 truncate">
								{user?.displayName}
							</p>
							<button
								className="uppercase font-semibold text-base leading-none text-my-dark-gray hover:text-my-primary"
								onClick={logOut}
							>
								Logout
							</button>
						</div>
					)}
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
