import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';

// create auth context
export const AuthContexts = createContext(null);

const AuthProvider = ({ children }) => {
	const allAuthContexts = useFirebase();

	return (
		<AuthContexts.Provider value={allAuthContexts}>
			{children}
		</AuthContexts.Provider>
	);
};

export default AuthProvider;