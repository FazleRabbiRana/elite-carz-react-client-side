import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	TwitterAuthProvider,
	FacebookAuthProvider,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

// initialize firebase
initializeFirebase();

const useFirebase = () => {
	const [user, setUser] = useState({});
	const [authError, setAuthError] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);

	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();
	const twitterProvider = new TwitterAuthProvider();
	const facebookProvider = new FacebookAuthProvider();

  // prepare auth error message
  const prepareAuthErrorMessage = error => {
    const errorCode = error.code;
    const errorText = errorCode.slice(5).replace(/-/g, ' ');
		MySwal.fire({
			icon: 'error',
			title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Error!</span>`,
			html: `<p class="text-sm text-red-500">${errorText}</p>`,
			confirmButtonText: `OK`,
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn-regular py-2',
			},
		});
    // console.log(errorText);
    return errorText;
  }

	// register user with email and password
	const registerWithEmail = (name, email, password, location, history) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then(result => {
				// console.log(result);
				const newUser = { email, displayName: name };
				setUser(newUser);
				setAuthError('');
				// update user profile
				updateProfile(auth.currentUser, {
					displayName: name,
				})
					.then(() => {
						console.log('Profile updated in Firebase.');
					})
					.catch(error => {
						console.log(error);
					});
				// add user to database
				saveUserToDatabase(email, name, 'POST');
				// return to prev page
				const redirect_url = location?.state?.from || '/dashboard';
				history.replace(redirect_url);
			})
			.catch(error => {
				// const errorText = prepareAuthErrorMessage(error);
				setAuthError(error.message);
				MySwal.fire({
					icon: 'error',
					title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Error!</span>`,
					html: `<p class="text-sm text-red-500">${error.message}</p>`,
					confirmButtonText: `OK`,
					buttonsStyling: false,
					customClass: {
						confirmButton: 'btn-regular py-2',
					},
				});
			})
			.finally(() => setIsLoading(false));
	};

	// login user using email and password
	const loginWithEmail = (email, password, location, history) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(result => {
				setAuthError('');
				// return to prev page
				const redirect_url = location?.state?.from || '/dashboard';
				history.replace(redirect_url);
			})
			.catch(error => {
				console.log(error);
				setAuthError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	// reset password
	const resetPasswordWithEmail = (email) => {
		sendPasswordResetEmail(auth, email)
			.then(result => {
				console.log(result);
				setAuthError('');
				MySwal.fire({
					icon: 'info',
					title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Email sent successfully!</span>`,
					html: `<p class="text-sm">The password reset link has been sent to the given email address. Click on that link to reset your password and after that come back here to login with your new password.</p>`,
					confirmButtonText: `OK`,
					buttonsStyling: false,
					customClass: {
						confirmButton: 'btn-regular py-2',
					},
				});
			})
			.catch(error => {
				console.log(error);
				// prepareAuthErrorMessage(error);
				setAuthError(prepareAuthErrorMessage(error));
				console.log(authError);
				// setAuthError(error.message);
				// MySwal.fire({
				// 	icon: 'error',
				// 	title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Error!</span>`,
				// 	html: `<p class="text-sm text-red-500">${error.message}</p>`,
				// 	confirmButtonText: `OK`,
				// 	buttonsStyling: false,
				// 	customClass: {
				// 		confirmButton: 'btn-regular py-2',
				// 	},
				// });
			});
	};

	// sign in with social account
	const signInWithSocial = (provider, location, history) => {
		setIsLoading(true);
		signInWithPopup(auth, provider)
			.then(result => {
				const user = result.user;
				// console.log(user);
				setAuthError('');
				// update user to database
				saveUserToDatabase(user.email, user.displayName, 'PUT');
				// return to prev page
				const redirect_url = location?.state?.from || '/dashboard';
				history.replace(redirect_url);
			})
			.catch(error => {
				console.log(error);
				setAuthError(error.message);
			})
			.finally(() => setIsLoading(false));
	}

	// sign in with google
	const signInWithGoogle = (location, history) => {
		signInWithSocial(googleProvider, location, history);
	};

	// sign in with github
	const signInWithGithub = (location, history) => {
		signInWithSocial(githubProvider, location, history);
	};

	// sign in with twitter
	const signInWithTwitter = (location, history) => {
		signInWithSocial(twitterProvider, location, history);
	};

	// sign in with facebook
	const signInWithFacebook = (location, history) => {
		signInWithSocial(facebookProvider, location, history);
	};

	// observe user auth state
	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, user => {
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

	// save user to database
	const saveUserToDatabase = (email, displayName, method) => {
		const user = { email, displayName };
		const url = `https://sheltered-caverns-44637.herokuapp.com/users`;
		axios({
			method: method,
			url: url,
			data: user,
		})
			.then(res => {
				// console.log(res.data);
				if (res.data?.insertedId) {
					console.log('User added to database');
				}
				if (res.data?.modifiedCount) {
					console.log('User updated in database');
				}
			})
			.catch(error => console.log(error));
	};

	// check is admin
	useEffect(() => {
		const url = `https://sheltered-caverns-44637.herokuapp.com/users/${user?.email}`;
		axios
			.get(url)
			.then(res => {
				setIsAdmin(res.data.admin);
			})
	}, [user?.email]);

	return {
		user,
		isAdmin,
		isLoading,
		authError,
		registerWithEmail,
		loginWithEmail,
		signInWithGoogle,
		signInWithGithub,
		signInWithTwitter,
		signInWithFacebook,
		resetPasswordWithEmail,
		logOut,
		setIsLoading,
	};
};

export default useFirebase;
