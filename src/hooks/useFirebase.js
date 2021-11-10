import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

// initialize firebase
initializeFirebase();

const useFirebase = () => {
	const [user, setUser] = useState({});
	const [authError, setAuthError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();

	// sign in with google
	const signInWithGoogle = () => {
		setIsLoading(true);
		signInWithPopup(auth, googleProvider)
			.then(result => {
				const user = result.user;
				console.log(user);
				setAuthError('');
			})
			.catch(error => {
				console.log(error);
				setAuthError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	// observe user auth state
	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser({});
			}
			setIsLoading(false);
		});
		return () => unsubscribed;
	}, [auth]);

	// log out function
	const logOut = () => {
		setIsLoading(true);
		signOut(auth)
			.then(() => {
				setAuthError('');
			})
			.catch(error => {
				console.log(error);
				setAuthError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	return {
		user,
		authError,
		isLoading,
		signInWithGoogle,
		logOut,
	};
};

export default useFirebase;
