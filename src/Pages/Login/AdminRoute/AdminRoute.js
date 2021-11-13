import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const AdminRoute = ({ children, ...rest}) => {
	const { user, isAdmin, isLoading } = useAuthContexts();
	
	if (isLoading) {
		return <LoadingStatus />;
	}

	return (
		<Route 
			{...rest}
			render={({ location }) => 
				user.email && isAdmin ? (
					children
				) : (
					<Redirect 
						to={{
							pathname: '/',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
};

export default AdminRoute;