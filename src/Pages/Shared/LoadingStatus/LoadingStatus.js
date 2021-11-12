import React from 'react';
import { RiLoader4Fill } from 'react-icons/ri';

const LoadingStatus = () => {
	return (
		<div className="loading-status text-center">
			<div className="inline-flex flex-nowrap items-center space-x-3 px-8 py-2 bg-transparent font-my-title text-lg">
				<p className="animate-spin"><RiLoader4Fill className="mx-auto text-2xl text-my-primary" /></p>
				<span>Loading</span>
			</div>
		</div>
	);
};

export default LoadingStatus;