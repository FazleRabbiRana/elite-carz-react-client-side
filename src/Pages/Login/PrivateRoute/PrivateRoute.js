import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const PrivateRoute = ({ children, ...rest }) => {
	const { user, isLoading } = useAuthContexts();
	
	if (isLoading) {
		return <LoadingStatus />;
	}

	return (
		<Route 
			{...rest}
			render={({ location }) => 
				user.email ? (
					children
				) : (
					<Redirect 
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;