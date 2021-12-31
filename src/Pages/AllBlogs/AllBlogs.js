import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContexts from '../../hooks/useAuthContexts';
import BlogCard from '../Shared/BlogCard/BlogCard';
import Footer from '../Shared/Footer/Footer';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';
import LoadingStatus from '../Shared/LoadingStatus/LoadingStatus';

const AllBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const { isLoading, setIsLoading } = useAuthContexts();

	// load all blogs
	useEffect(() => {
		setIsLoading(true);
		axios
			.get('https://sheltered-caverns-44637.herokuapp.com/blogs')
			.then(res => {
				// console.log(res.data);
				setBlogs(res.data);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<>
			<HeaderNavbar />
			<main id="all_blogs_page" className="all-blogs-page pt-16 md:pt-20">
				<section id="all_blogs" className="py-8 lg:py-12 bg-true-gray-100 bg-opacity-50">
					<div className="text-center mb-8">
						<h2 className="text-4xl">Our Blogs</h2>
					</div>
					{isLoading && <LoadingStatus />}
					<div className="container">
						<div className="blogs-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 xl:gap-x-10">
						{
							blogs.map((blog, index) => <BlogCard key={blog._id} blog={blog} index={index} />)
						}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default AllBlogs;