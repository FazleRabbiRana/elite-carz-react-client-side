import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiAsterisk } from 'react-icons/ri';
import useAuthContexts from '../../../hooks/useAuthContexts';

const AddReview = () => {
	const { user } = useAuthContexts();
	const [success, setSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// add review
	const onSubmit = data => {
		// console.log(data);
		axios
			.post('https://sheltered-caverns-44637.herokuapp.com/reviews', data)
			.then(res => {
				// console.log(res);
				if (res.data.insertedId) {
					setSuccess(true);
					reset();
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

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
							Full name{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
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
							Your review{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<textarea
							{...register('review', { required: true })}
							className="form-field h-32 py-2"
							placeholder="Type here..."
						></textarea>
					</div>
					<div>
						<label className="block mb-1">
							Rating{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />{' '}
							<span className="opacity-70 text-sm">(higher is better)</span>
						</label>
						<select className="form-field" {...register('rating')}>
							<option value="5">5</option>
							<option value="4">4</option>
							<option value="3">3</option>
							<option value="2">2</option>
							<option value="1">1</option>
						</select>
					</div>
					<div>
						<label className="block mb-1">
							Country name{' '}
							<RiAsterisk className="inline text-my-xs text-red-500 transform -translate-y-1" />
						</label>
						<input
							className="form-field"
							placeholder="e.g. USA"
							{...register('location', { required: true })}
						/>
					</div>
					<div>
						<label className="block mb-1">Gender</label>
						<select className="form-field" {...register('gender')}>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
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
				<div className="status">
					{success && (
						<h5 className="mt-3 text-green-600">Review added successfully!</h5>
					)}
				</div>
			</div>
		</section>
	);
};

export default AddReview;
