import React from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk } from 'react-icons/ri';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';

const RegisterForm = () => {
	const { user, registerWithEmail } = useAuthContexts();
	const { register, handleSubmit, getValues, formState: { errors } } = useForm();
	const location = useLocation();
	const history = useHistory();

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

	// required password regular expression
	const passRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8,}$/;

	// required field mark
	const requiredMark = <RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />;

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
					<label className="block mb-1 tracking-normal">
						Full name {requiredMark}
					</label>
					<input
						className="form-field"
						placeholder="e.g. Abu Dujana"
						{...register('displayName', { required: true })}
					/>
				</div>
				<div>
					<label className="block mb-1 tracking-normal">
						Email address {requiredMark}
					</label>
					<input
						type="email"
						className="form-field"
						placeholder="e.g. email@email.com"
						{...register('email', { required: true })}
					/>
				</div>
				<div>
					<label className="block mb-1 tracking-normal">
						Password {requiredMark}
					</label>
					<input
						type="password"
						className="form-field"
						placeholder="********"
						{...register('regPassword', { required: true, pattern: passRegex })}
					/>
					<p className="text-my-sm leading-normal text-gray-400 mt-2">
						<b>Password requirement:</b> At least 8 chars long, contain at least one special character (!@#$&*), two numerals (0-9) and three letters (two in UPPERCASE). No spaces and emoji.
					</p>
				</div>
				<div>
					<label className="block mb-1 tracking-normal">
						Confirm password {requiredMark}
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
					<label className="block mb-1 tracking-normal">Gender</label>
					<select
						className="form-field"
						{...register('gender')}
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div> */}
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						className="h-4 w-4"
						{...register('agreeTerms', { required: true })}
					/>
					<label className="block mb-1 tracking-normal leading-none">
						Agree to the <Link to="/terms-conditions" className="text-blue-500 hover:text-blue-700">Terms and Conditions</Link> {requiredMark}
					</label>
				</div>
				<div>
					{(errors.displayName ||
						errors.email ||
						errors.regPassword ||
						errors.confirmPassword ||
						errors.agreeTerms) && (
						<p className="text-sm text-red-600 leading-loose">
							Please fill up the form properly.
						</p>
					)}
					<div className="flex items-start space-x-4">
						{!user?.email && <input type="submit" className="btn-regular" value="Register" />}
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
