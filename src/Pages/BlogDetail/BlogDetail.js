import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../Shared/Footer/Footer';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';

const BlogDetail = () => {
	const { blogId } = useParams();
	const [blog, setBlog] = useState({});

	// load blog with id
	useEffect(() => {
		const url = `http://localhost:5000/blogs/${blogId}`;
		axios
			.get(url)
			.then(res => {
				console.log(res.data);
				setBlog(res.data);
			})
	}, [blogId]);

	return (
		<>
			<HeaderNavbar />
			<main  id="blog_detail_page" className="blog-detail-page pt-16 md:pt-20">
				<section id="blog_detail" className="blog-detail py-8 lg:py-12">
					<div className="container">
						Blog detail page {blogId}
						<h2>{blog?.title}</h2>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default BlogDetail;