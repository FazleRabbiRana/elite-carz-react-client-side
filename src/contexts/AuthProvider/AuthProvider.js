import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';

export const AuthContexts = createContext(null);

const AuthProvider = ({ children }) => {
	const allAuthContexts = useFirebase();
	console.log(allAuthContexts);

	return (
		<AuthContexts.Provider value={allAuthContexts}>
			{children}
		</AuthContexts.Provider>
	);
};

export default AuthProvider;