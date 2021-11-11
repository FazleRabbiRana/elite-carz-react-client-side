import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import male from '../../../images/avatar-male.png';
import female from '../../../images/avatar-female.png';
import car from '../../../images/bg/bg-8.png';
import reviewBg from '../../../images/bg/bg-2.jpg';

const Reviews = () => {
	const [reviews, setReviews] = useState([]);

	// load all reviews
	useEffect(() => {
		axios
			.get('http://localhost:5000/reviews')
			.then(res => {
				console.log(res.data);
				setReviews(res.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	// reviews slider settings
	const settings = {
		dots: true,
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 7000,
		cssEase: 'linear',
		pauseOnHover: true,
	};

	return (
		<section id="home_reviews" className="relative">
			<div style={{backgroundImage: `url(${reviewBg})`}} className="bg-no-repeat bg-cover bg-center bg-gray-800 bg-opacity-70 bg-blend-overlay pt-16 pb-12 md:pb-16 shadow-my-y-heavy">
				<div className="container max-w-3xl text-center">
					<Slider {...settings} className="home-reviews-slider pb-24">
						{reviews.map(review => (
							<div key={review._id} className="single-slide">
								<img
									src={review?.gender.toLowerCase() === 'male' ? male : female}
									alt="Avatar"
									className="w-32 h-32 mx-auto rounded-full border-8 border-gray-700"
								/>
								<p className="mt-6 mb-4 text-gray-100 lg:text-lg leading-relaxed lg:leading-loose">
									{review?.review}
								</p>
								<div className="rating-stars inline-block p-0 relative text-3xl">
									<div className="empty-rating m-0 p-0 leading-none z-0">
										<span className="star">★★★★★</span>
									</div>
									<div
										className="fill-rating m-0 p-0 leading-none z-pos1 text-my-primary-light overflow-hidden absolute top-0 left-0"
										style={{ width: `${review?.rating * 20 + '%'}` }}
									>
										<span className="star">★★★★★</span>
									</div>
								</div>
								<h3 className="mt-2 text-white">
									<span className="inline-block text-my-primary-dark text-2xl">{review?.userName}</span>, &nbsp;
									{review?.location}
								</h3>
							</div>
						))}
					</Slider>
				</div>
			</div>
			<div className="text-center">
				<img src={car} alt="Red elegant car" className="mx-auto max-w-clear w-3/4 md:w-1/2 lg:w-auto -mt-10" />
			</div>
		</section>
	);
};

export default Reviews;
