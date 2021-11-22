import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../../images/bg/bg-1.jpg';
import logo from '../../logo.svg';

const NotFound = () => {
	const bgStyle = {
		backgroundImage: `url(${bgImg})`,
	}

	return (
		<>
			<header className="navbar bg-opacity-75 px-4">
				<div className="logo-wrapper w-28 md:w-36 mx-auto">
					<Link to="/home">
						<img src={logo} alt="Elite Carz logo" className="w-full" />
					</Link>
				</div>
			</header>
			<main 
				id="not_found_page" 
				className="not-found-page h-screen bg-no-repeat bg-cover bg-center bg-true-gray-800" 
				style={bgStyle}
			>
				<div className="w-full h-full flex items-center justify-center text-center">
					<div className="container mb-12">
						<h3 className="text-7xl text-gray-300 animate-myHeartBeat mb-10">Oops!</h3>
						<h2 className="text-my-primary uppercase text-4xl lg:text-5xl animate-myMoveUp">Page Not Found</h2>
						<div className="mt-10">
							<Link 
								to="/home" 
								className="btn-regular text-sm py-2 animate-myMoveUp"
								style={{animationDelay: '0.3s'}}
							>
								Back to home
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default NotFound;