import React from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk, RiGoogleFill, RiTwitterFill, RiGithubFill } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const LoginForm = () => {
	const { loginWithEmail, signInWithGoogle, signInWithTwitter, signInWithGithub, user, isLoading, authError } = useAuthContexts();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const location = useLocation();
	const history = useHistory();

	// register form submit
	const onSubmit = data => {
		// console.log(data);
		loginWithEmail(data.loginEmail, data.loginPassword, location, history);
	};

	// handle google sign in
	const handleGoogleSignIn = () => {
		signInWithGoogle(location, history);
	}

	// handle twitter sign in
	const handleTwitterSignIn = () => {
		signInWithTwitter(location, history);
	}

	// handle github sign in
	const handleGithubSignIn = () => {
		signInWithGithub(location, history);
	}

	return (
		<div className="login-form-wrapper">
			<h3 className="uppercase text-2xl mb-4 text-center">
				<span className="font-semibold text-my-primary">Login</span> Now
			</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
				<div>
					<label className="block mb-1">
						Email address <RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input 
						type="email"
						className="form-field"
						placeholder="Your email address"
						{...register('loginEmail', { required: true })} 
					/>
				</div>
				<div>
					<label className="block mb-1">
						Password <RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input 
						type="password"
						className="form-field"
						placeholder="Your password"
						{...register('loginPassword', { required: true })} 
					/>
				</div>
				<div>
					{(errors.loginEmail ||
						errors.loginPassword) && (
						<p className="text-sm text-red-600 leading-loose">
							Please fill up the form properly.
						</p>
					)}
					{!user?.email && <input type="submit" className="btn-regular" value="Login" />}
					{isLoading && <LoadingStatus />}
				</div>
			</form>
			<div className="status">
				{user?.email && <h5 className="mt-3 text-green-600">Logged in successfully!</h5>}
				{authError && <h5 className="mt-3 text-red-600">{authError}</h5>}
			</div>
			<div className="divider mt-5 mb-3 flex flex-nowrap items-center font-my-title uppercase font-semibold text-true-gray-800">
				<hr className="flex-auto border-my-primary border-dashed" />
				<span className="px-3">Or use</span>
				<hr className="flex-auto border-my-primary border-dashed" />
			</div>
			<div className="direct-sign-in-options space-y-4">
				<button 
					onClick={handleGoogleSignIn}
					className="btn-social-login"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-true-gray-400">
						<RiGoogleFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with Google</span>
				</button>
				<button 
					onClick={handleTwitterSignIn}
					className="btn-social-login"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-true-gray-400">
						<RiTwitterFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with Twitter</span>
				</button>
				<button 
					onClick={handleGithubSignIn}
					className="btn-social-login"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-true-gray-400">
						<RiGithubFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with GitHub</span>
				</button>
			</div>
		</div>
	);
};

export default LoginForm;