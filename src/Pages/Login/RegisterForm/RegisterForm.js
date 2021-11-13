import React from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const RegisterForm = () => {
	const { user, registerWithEmail, isLoading } = useAuthContexts();
	const location = useLocation();
	const history = useHistory();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	// register form submit
	const onSubmit = data => {
		// console.log(data);
		registerWithEmail(
			data.displayName,
			data.email,
			data.regPassword,
			location,
			history
		);
	};

	return (
		<div className="register-form-wrapper">
			<h3 className="uppercase text-2xl mb-4 text-center">
				<span className="font-semibold text-my-primary">Register</span> Now
			</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
			>
				<div>
					<label className="block mb-1">
						Full name{' '}
						<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input
						className="form-field"
						placeholder="e.g. Abu Dujana"
						{...register('displayName', { required: true })}
					/>
				</div>
				<div>
					<label className="block mb-1">
						Email address{' '}
						<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input
						type="email"
						className="form-field"
						placeholder="e.g. email@email.com"
						{...register('email', { required: true })}
					/>
				</div>
				<div>
					<label className="block mb-1">
						Password{' '}
						<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input
						type="password"
						className="form-field"
						placeholder="Min 6 characters"
						{...register('regPassword', { required: true, minLength: 6 })}
					/>
				</div>
				<div>
					<label className="block mb-1">
						Confirm password{' '}
						<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
					</label>
					<input
						type="password"
						className="form-field"
						placeholder="Confirm password"
						{...register('confirmPassword', {
							required: true,
							validate: {
								matchesPreviousPassword: value => {
									const { regPassword } = getValues();
									return regPassword === value || 'Passwords should match!';
								},
							},
						})}
					/>
					{errors.confirmPassword && (
						<span className="text-xs text-red-600">
							{errors.confirmPassword.message}
						</span>
					)}
				</div>
				{/* <div>
					<label className="block mb-1">Gender</label>
					<select
						className="form-field"
						{...register('gender')}
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div> */}
				<div>
					{(errors.displayName ||
						errors.email ||
						errors.regPassword ||
						errors.confirmPassword) && (
						<p className="text-sm text-red-600 leading-loose">
							Please fill up the form properly.
						</p>
					)}
					{(!user?.email && !isLoading) && <input type="submit" className="btn-regular" value="Register" />}
					{isLoading && <LoadingStatus />}
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
