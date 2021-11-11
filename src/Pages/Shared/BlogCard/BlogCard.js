import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
	const { _id, title, image, description } = blog;

	return (
		<div className="blog-card flex flex-col">
			<div className="image mb-4 border-4 border-gray-600">
				<img src={image} alt={title} className="w-full h-full object-cover object-center" />
			</div>
			<h3 className="flex-auto border-l-4 border-my-primary py-1 pl-4 text-my-primary-dark text-xl md:text-2xl">{title}</h3>
			<p className="mt-2">
				<Link to={`blog/${_id}`} className="inline-block font-my-title tracking-wide border-b border-my-primary-dark text-gray-400 hover:text-my-primary-dark">
					Read more
				</Link>
			</p>
		</div>
	);
};

export default BlogCard;