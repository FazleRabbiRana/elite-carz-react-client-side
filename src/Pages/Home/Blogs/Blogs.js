import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../../Shared/BlogCard/BlogCard';
import blogBg from '../../../images/bg/bg-3.jpg';
import useAuthContexts from '../../../hooks/useAuthContexts';

const Blogs = () => {
	const { setIsLoading } = useAuthContexts();
	const [blogs, setBlogs] = useState([]);
	const homeBlogs = blogs.slice(0, 3);

	// load all blogs
	useEffect(() => {
		setIsLoading(true);
		axios
			.get('https://sheltered-caverns-44637.herokuapp.com/blogs')
			.then(res => {
				// console.log(res.data);
				setBlogs(res.data);
			})
			.catch(error => console.log(error))
			.finally(() => setIsLoading(false));
	}, []);

	// blog section bg
	const bgImg = {
		backgroundImage: `url(${blogBg})`,
	}

	return (
		<section id="home_blogs" className="py-16 md:py-20 bg-no-repeat bg-cover bg-center bg-gray-900 bg-opacity-50 bg-blend-overlay" style={bgImg}>
			<div className="container">
				<div className="text-center mb-12">
					<p className="uppercase font-medium text-white font-my-title text-sm tracking-widest mb-2 md:mb-3">Articles from blog</p>
					<h2 className="text-my-primary text-4xl">Read Our Articles</h2>
				</div>
				{/* {isBlogsLoading && <LoadingStatus />} */}
				<div className="blogs-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 xl:gap-x-10">
					{
						homeBlogs.map((blog, index) => <BlogCard key={blog._id} blog={blog} index={index} />)
					}
				</div>
			</div>
		</section>
	);
};

export default Blogs;