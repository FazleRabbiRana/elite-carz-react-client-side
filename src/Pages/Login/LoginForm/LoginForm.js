import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk, RiGoogleFill, RiGithubFill, RiTwitterFill } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import AOS from 'aos';

const LoginForm = () => {
	const { loginWithEmail, signInWithGoogle, signInWithTwitter, signInWithGithub, resetPasswordWithEmail, user } = useAuthContexts();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const location = useLocation();
	const history = useHistory();
	const [enteredLoginEmail, setEnteredLoginEmail] = useState('');

	// login form submit
	const onSubmit = data => {
		// console.log(data);
		loginWithEmail(data.loginEmail, data.loginPassword, location, history);
	};

	// initialize aos plugin
	useEffect(() => {
		AOS.init({
			duration: 700,
			once: true,
			anchorPlacement: 'top-bottom',
		});
	}, []);

	return (
		<div className="login-form-wrapper">
			<h3 className="uppercase text-2xl mb-4 text-center">
				<span className="font-semibold text-my-primary">Login</span> Now
			</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
				<div>
					<label className="block mb-1 tracking-normal">
						Email address{' '}
						<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input
						type="email"
						className="form-field"
						placeholder="Your email address"
						{...register('loginEmail', {
							required: true,
							onBlur: e => setEnteredLoginEmail(e.target.value),
						})}
					/>
				</div>
				<div>
					<label className="block mb-1 tracking-normal">
						Password{' '}
						<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input
						type="password"
						className="form-field"
						placeholder="Your password"
						{...register('loginPassword', { required: true })}
					/>
					<p className="text-my-sm leading-relaxed text-gray-400 mt-2">
						Forgot password?{' '}
						<button
							onClick={e => {
								e.preventDefault();
								resetPasswordWithEmail(enteredLoginEmail);
							}}
							className="text-blue-500 hover:text-blue-700"
						>
							Reset now
						</button>
					</p>
				</div>

				<div>
					{(errors.loginEmail || errors.loginPassword) && (
						<p className="text-sm text-red-600 leading-loose">Please fill up the form properly.</p>
					)}
					<div className="flex items-start space-x-4">
						{!user?.email && <input type="submit" className="btn-regular" value="Login" />}
					</div>
				</div>
			</form>

			<div className="hints text-my-sm leading-relaxed text-gray-400 mt-3">
				<b>Hints:</b> Use "<span className="font-semibold">admin@admin.com</span>" and "
				<span className="font-semibold tracking-wider">ASdf43!2</span>" to login as an Admin.
			</div>

			<div className="status">
				{user?.email && (
					<h5 className="mt-3 text-green-600">Currently logged in with {user?.email}</h5>
				)}
			</div>

			<div className="divider mt-5 mb-3 flex flex-nowrap items-center font-my-title uppercase font-semibold text-true-gray-800">
				<hr className="flex-auto border-my-primary border-dashed" />
				<span className="px-3">Or use any of these</span>
				<hr className="flex-auto border-my-primary border-dashed" />
			</div>

			<div className="direct-sign-in-options space-y-4">
				<button
					onClick={() => signInWithGoogle(location, history)}
					className="btn-social-login bg-my-google"
					data-aos="fade-up"
					data-aos-delay="100"
					data-aos-anchor="#login_page"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-true-gray-400">
						<RiGoogleFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with Google</span>
				</button>
				<button
					onClick={() => signInWithGithub(location, history)}
					className="btn-social-login bg-my-github"
					data-aos="fade-up"
					data-aos-delay="200"
					data-aos-anchor="#login_page"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-true-gray-400">
						<RiGithubFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with GitHub</span>
				</button>
				<button
					onClick={() => signInWithTwitter(location, history)}
					className="btn-social-login bg-my-twitter"
					data-aos="fade-up"
					data-aos-delay="300"
					data-aos-anchor="#login_page"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-true-gray-400">
						<RiTwitterFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with Twitter</span>
				</button>
				{/* <button 
					onClick={() => signInWithFacebook(location, history)}
					className="btn-social-login bg-my-facebook"
				>
					<span className="flex-shrink-0 h-full w-12 flex items-center justify-center border-r border-true-gray-400">
						<RiFacebookFill className="text-xl" />
					</span>
					<span className="flex-auto">Login with Facebook</span>
				</button> */}
			</div>
		</div>
	);
};

export default LoginForm;