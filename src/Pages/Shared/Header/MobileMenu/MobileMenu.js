import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './MobileMenu.css';
import MainMenu from '../MainMenu/MainMenu';
import { FiX } from 'react-icons/fi';

const MobileMenu = () => {
	return (
		<Menu width={ '260px' } customCrossIcon={ <FiX /> }>
			<MainMenu />
		</Menu>
	);
};

export default MobileMenu;