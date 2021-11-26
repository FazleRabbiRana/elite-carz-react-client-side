import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk } from 'react-icons/ri';
import useAuthContexts from '../../../hooks/useAuthContexts';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const AddReview = () => {
	const { user } = useAuthContexts();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// add review
	const onSubmit = data => {
		// console.log(data);
		if (data.userImg) {
			data.userImg = user?.photoURL ? user?.photoURL : null;
		} else {
			data.userImg = null;
		}
		
		axios
			.post('https://sheltered-caverns-44637.herokuapp.com/reviews', data)
			.then(res => {
				// console.log(res);
				if (res.data.insertedId) {
					reset();
					MySwal.fire({
						icon: 'success',
						title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Review added successfully!</span>`,
						confirmButtonText: `OK`,
						buttonsStyling: false,
						customClass: {
							confirmButton: 'btn-regular py-2',
						},
					});
				}
			})
			.catch(err => console.log(err));
	};

	// required field mark
	const requiredMark = <RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />;

	return (
		<section id="add_review" className="add-review">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">
				Add Review
			</h3>
			<div className="max-w-md">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-4"
				>
					<div>
						<label className="block mb-1">
							Full name {requiredMark}
						</label>
						<input
							className="form-field"
							placeholder="e.g. Abu Dujana"
							defaultValue={user.displayName}
							{...register('userName', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">
							Your review {requiredMark}
						</label>
						<textarea
							{...register('review', { required: true })}
							className="form-field h-32 py-2"
							placeholder="Type here..."
						></textarea>
					</div>
					<div>
						<label className="block mb-1">
							Rating {requiredMark}
							<span className="opacity-70 text-sm"> (higher is better)</span>
						</label>
						<select className="form-field" {...register('rating')}>
							<option value="5">5 - Excellent</option>
							<option value="4">4 - Good</option>
							<option value="3">3 - Average</option>
							<option value="2">2 - Bad</option>
							<option value="1">1 - Worst</option>
						</select>
					</div>
					<div>
						<label className="block mb-1">
							Country name {requiredMark}
						</label>
						<input
							className="form-field"
							placeholder="e.g. USA"
							{...register('location', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">Gender</label>
						<select 
							className="form-field" 
							{...register('gender')}
							defaultValue=""
						>
							<option value="" disabled hidden>Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							defaultChecked
							className="h-4 w-4"
							{...register('userImg')}
						/>
						<label className="block mb-1 tracking-normal leading-none">
							Include profile image if available.
						</label>
					</div>
					<div className="mt-4">
						{(errors.review || errors.rating || errors.location) && (
							<p className="text-sm text-red-600 leading-loose">
								Please fill up the form properly.
							</p>
						)}
						<input type="submit" value="Add Review" className="btn-regular" />
					</div>
				</form>
			</div>
		</section>
	);
};

export default AddReview;
