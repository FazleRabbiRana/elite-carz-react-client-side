import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const MakeAdmin = () => {
	const [users, setUsers] = useState([]);
	const [processing, setProcessing] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isRegistered, setIsRegistered] = useState(true);
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	// load all users
	useEffect(() => {
		axios
			.get(`https://sheltered-caverns-44637.herokuapp.com/users`)
			.then(res => {
				setUsers(res.data);
			})
			.catch(error => console.log(error));
	}, []);

	// process make admin
  const onSubmit = data => {
		setProcessing(true);
		// check registered email
		const isRegisteredEmail = users.find(user => user.email === data.email);
		if (!isRegisteredEmail) {
			setProcessing(false);
			setIsRegistered(false);
			return;
		}
		// set admin role in database
		const url = `https://sheltered-caverns-44637.herokuapp.com/users/admin`;
		axios
			.put(url, data)
			.then(res => {
				setIsRegistered(true);
				if (res.data.modifiedCount) {
					setSuccess(true);
					reset();
				} else {
					setSuccess(false);
				}
			})
			.catch(error => console.log(error))
			.finally(() => setProcessing(false));
	};

	return (
		<section id="make_admin" className="make-admin">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">
				Make Admin
			</h3>
			<div className="max-w-md">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
					<div>
						<input
							type="email"
							placeholder="Email address"
							className="form-field"
							{...register('email', { required: true })}
						/>
						{errors.email && (
							<span className="text-xs text-red-600">This field is required</span>
						)}
					</div>
					<div>
						{!processing ? (
							<input
								type="submit"
								value="Confirm"
								className="btn-regular"
							/>
						) : (
							<LoadingStatus />
						)}
					</div>
				</form>
				<div className="status">
					{success && (
						<h5 className="mt-3 text-green-600">Admin added successfully!</h5>
					)}
					{!isRegistered && (
						<p className="mt-3 text-red-600 text-xs md:text-sm">This email is not registered yet. Email must be registered already to add Admin role.</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default MakeAdmin;