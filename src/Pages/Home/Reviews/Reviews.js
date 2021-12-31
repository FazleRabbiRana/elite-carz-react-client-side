import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import maleAvatar from '../../../images/avatar-male.png';
import femaleAvatar from '../../../images/avatar-female.png';
import unknownAvatar from '../../../images/avatar-gender-unknown.png';
import car from '../../../images/bg/bg-4.png';
import reviewBg from '../../../images/bg/bg-7.jpg';
import { RiArrowRightSLine, RiArrowLeftSLine, RiStarSFill } from 'react-icons/ri';
import AOS from 'aos';
import useAuthContexts from '../../../hooks/useAuthContexts';

const Reviews = () => {
	const { setIsLoading } = useAuthContexts();
	const [reviews, setReviews] = useState([]);

	// load all reviews
	useEffect(() => {
		setIsLoading(true);
		axios
			.get('https://sheltered-caverns-44637.herokuapp.com/reviews')
			.then(res => {
				// console.log(res.data);
				const allReviews = res.data;
				const reversed = [...allReviews].reverse();
				const mixedReviews = allReviews.length <= 10 ? reversed : [...reversed.slice(0, 5)].concat(allReviews.slice(0, 5).reverse());
				// console.log(mixedReviews);
				setReviews(mixedReviews);
			})
			.catch(error => console.log(error))
			.finally(() => setIsLoading(false));
		
		// initialize AOS plugin
		AOS.init();
	}, []);

	// reviews slider settings
	const settings = {
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 400,
		autoplay: false,
		autoplaySpeed: 7000,
		cssEase: 'linear',
		pauseOnHover: true,
		adaptiveHeight: false,
		responsive: [
			{
				breakpoint: 640,
				settings: {
					adaptiveHeight: false,
				}
			},
			{
				breakpoint: 320,
				settings: {
					adaptiveHeight: true,
				}
			},
		]
	};

	// ref to create slider custom arrows
	const slider = useRef(null);

	// set avatar fake image
	const setAvatarImg = gender => {
		const value = gender && gender.toLowerCase();
		let src = unknownAvatar;
		if (value === 'male') {
			src = maleAvatar;
		} else if (value === 'female') {
			src = femaleAvatar;
		}
		return src;
	}

	return (
		<section id="home_reviews" className="relative">
			<div
				style={{ backgroundImage: `url(${reviewBg})` }}
				className="bg-no-repeat bg-cover bg-center bg-gray-900 bg-opacity-80 bg-blend-overlay pt-16 pb-14 md:pb-24 lg:pb-44"
				id="review_bg_wrapper"
			>
				<div className="container max-w-3xl text-center">
					<div className="text-center mb-12">
						<p className="uppercase font-medium text-white font-my-title text-sm tracking-widest mb-2 md:mb-3">
							Clients Reviews
						</p>
						<h2 className="text-my-primary text-4xl">What They Say</h2>
					</div>
					{/* {isReviewsLoading && <LoadingStatus />} */}
					<div className="relative">
						<div className="slick-custom-arrows z-30 absolute bottom-7 w-full flex items-center justify-center space-x-4 text-4xl">
							<button
								onClick={() => slider?.current?.slickPrev()}
								className="slick-custom-nav prev bg-my-secondary text-white duration-300 hover:bg-my-secondary-dark"
							>
								<RiArrowLeftSLine />
							</button>
							<button
								onClick={() => slider?.current?.slickNext()}
								className="slick-custom-nav next bg-my-secondary text-white duration-300 hover:bg-my-secondary-dark"
							>
								<RiArrowRightSLine />
							</button>
						</div>
						<Slider
							{...settings}
							ref={slider}
							className="home-reviews-slider pb-24"
						>
							{reviews.map(review => (
								<div key={review._id} className="single-slide">
									<img 
										src={review?.userImg ? review?.userImg : setAvatarImg(review?.gender)} 
										alt="Avatar" 
										className="w-32 h-32 mx-auto rounded-full border-8 border-gray-700"
									/>
									<p className="mt-6 mb-4 text-white lg:text-lg leading-relaxed lg:leading-loose">
										{review?.review}
									</p>
									<div className="rating-stars inline-block p-0 relative text-3xl text-gray-200">
										<div className="empty-rating flex flex-nowrap m-0 p-0 leading-none z-0">
											{[...Array(5).keys()].map((star) => <span key={star + ' '} className="star"><RiStarSFill /></span>)}
											{/* <span className="star">★★★★★</span> */}
										</div>
										<div
											className="fill-rating flex flex-nowrap m-0 p-0 leading-none z-pos1 text-my-primary overflow-hidden absolute top-0 left-0"
											style={{ width: `${review?.rating * 20 + '%'}` }}
										>
											{[...Array(5).keys()].map((star) => <span key={star + ' '} className="star"><RiStarSFill /></span>)}
										</div>
									</div>
									<h3 className="mt-2 text-white text-lg">
										<span className="inline-block text-2xl">
											{review?.userName}
										</span>
										, &nbsp;
										{review?.location}
									</h3>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
			<div className="text-center">
				<img
					src={car}
					alt="Red elegant car"
					className="mx-auto max-w-clear w-3/4 md:w-1/2 lg:w-auto -mt-12 md:-mt-20 lg:-mt-36"
					data-aos="zoom-in" 
					data-aos-duration="500" 
					data-aos-delay="50"
					data-aos-once="true"
					data-aos-anchor="#review_bg_wrapper"
					data-aos-anchor-placement="bottom-bottom"
				/>
			</div>
		</section>
	);
};

export default Reviews;
