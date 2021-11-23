import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const BlogCard = ({ blog, index }) => {
	const { _id, title, image } = blog;

	// initialize aos plugin
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div 
			className="blog-card flex flex-col group"
			data-aos="fade-up" 
			data-aos-duration="700" 
			data-aos-delay={`${index * 100 + 50}`}
			data-aos-once="true"
			data-aos-anchor-placement="top-bottom"
		>
			<div className="image mb-4 border-4 border-gray-600 overflow-hidden">
				<img src={image} alt={title} className="w-full h-full object-cover object-center transform duration-500 group-hover:scale-110" />
			</div>
			<Link to={`blog/${_id}`}>
				<h3 className="flex-auto border-l-4 border-my-primary py-1 pl-4 text-my-primary-dark text-xl md:text-2xl">{title}</h3>
			</Link>
			<p className="mt-2">
				<Link to={`blog/${_id}`} className="inline-block font-my-title tracking-wide border-b border-my-primary-dark text-gray-400 hover:text-my-primary-dark">
					Read more
				</Link>
			</p>
		</div>
	);
};

export default BlogCard;