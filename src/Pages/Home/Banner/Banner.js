import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import banner1 from '../../../images/banner/banner-bg-1.jpg';
import banner2 from '../../../images/banner/banner-bg-2-1.jpg';

const Banner = () => {
	return (
		<section id="home_banner" className="h-screen pt-16 md:pt-20">
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={swiper => console.log(swiper)}
				className="h-full"
			>
				<SwiperSlide style={{backgroundImage: `url(${banner1})`}} className="bg-no-repeat bg-cover bg-center">
					<div className="container pt-4">
						Slide 1
					</div>
				</SwiperSlide>
				<SwiperSlide style={{backgroundImage: `url(${banner2})`}} className="bg-no-repeat bg-cover bg-center">
					<div className="container pt-4">
						Slide 2
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default Banner;
