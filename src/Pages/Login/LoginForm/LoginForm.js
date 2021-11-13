import React from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk, RiGoogleFill } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const LoginForm = () => {
	const { loginWithEmail, signInWithGoogle, user, isLoading, authError } = useAuthContexts();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const location = useLocation();
	const history = useHistory();

	// register form submit
	const onSubmit = data => {
		console.log(data);
		loginWithEmail(data.loginEmail, data.loginPassword, location, history);
	};

	// handle google sign in
	const handleGoogleSignIn = () => {
		signInWithGoogle(location, history);
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
							Please Fill up the form properly.
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
			<div className="direct-sign-in-options">
				<button 
					onClick={handleGoogleSignIn}
					className="w-full h-10 bg-blue-600 text-white flex flex-nowrap items-center text-center duration-300 hover:bg-blue-700"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-blue-500">
						<RiGoogleFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with Google</span>
				</button>
			</div>
		</div>
	);
};

export default LoginForm;