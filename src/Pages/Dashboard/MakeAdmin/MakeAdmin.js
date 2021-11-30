import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const MakeAdmin = () => {
	const [users, setUsers] = useState([]);
	const [processing, setProcessing] = useState(false);
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
		// setProcessing(true);
		// // return if email not registered
		// const isRegisteredEmail = users.find(user => user.email === data.email);
		// if (!isRegisteredEmail) {
		// 	setProcessing(false);
		// 	MySwal.fire({
		// 		icon: 'warning',
		// 		title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Not allowed!</span>`,
		// 		html: `<p class="text-sm"><span class="font-semibold">${data.email}</span> is not registered yet. Email must be registered before adding Admin role.</p>`,
		// 		confirmButtonText: `OK`,
		// 		buttonsStyling: false,
		// 		customClass: {
		// 			confirmButton: 'btn-regular py-2',
		// 		},
		// 	});
		// 	return;
		// }

		// set admin role in database
		// const url = `https://sheltered-caverns-44637.herokuapp.com/users/admin`;
		// axios
		// 	.put(url, data)
		// 	.then(res => {
		// 		if (res.data.modifiedCount) {
		// 			MySwal.fire({
		// 				icon: 'success',
		// 				title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Successful!</span>`,
		// 				html: `<p class="text-sm"><span class="font-semibold">${data.email}</span> is now an ADMIN.</p>`,
		// 				confirmButtonText: `OK`,
		// 				buttonsStyling: false,
		// 				customClass: {
		// 					confirmButton: 'btn-regular py-2',
		// 				},
		// 			});
		// 			reset();
		// 		} 
		// 		else {
		// 			MySwal.fire({
		// 				icon: 'info',
		// 				title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Action not taken</span>`,
		// 				html: `<p class="text-sm"><span class="font-semibold">${data.email}</span> is already set as admin.</p>`,
		// 				confirmButtonText: `OK`,
		// 				buttonsStyling: false,
		// 				customClass: {
		// 					confirmButton: 'btn-regular py-2',
		// 				},
		// 			});
		// 		}
		// 	})
		// 	.catch(error => console.log(error))
		// 	.finally(() => setProcessing(false));

		MySwal.fire({
			icon: 'warning',
			title: ``,
			html: `<span class="inline-block font-medium text-sm">For security purpose make admin system is disabled currently.</span>`,
			confirmButtonText: `OK`,
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn-regular py-2',
			},
		});
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
			</div>
		</section>
	);
};

export default MakeAdmin;