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
		const url = `https://sheltered-caverns-44637.herokuapp.com/blogs/${blogId}`;
		axios.get(url).then(res => {
			console.log(res.data);
			setBlog(res.data);
		});
	}, [blogId]);

	return (
		<>
			<HeaderNavbar />
			<main id="blog_detail_page" className="blog-detail-page pt-16 md:pt-20">
				<section id="blog_detail" className="blog-detail py-8 lg:py-12">
					<div className="container">
						<h2 className="text-3xl mb-8">{blog?.title}</h2>
						<div className="md:flex md:justify-between md:space-x-4 xl:space-x-8 space-y-10 md:space-y-0">
							<div className="flex-grow-1 xl:max-w-screen-lg">
								<div className="product-detail-info h-full">
									<div className="image bg-gray-200 w-full md:min-h-250px" style={{aspectRatio: '16/9'}}>
										<img src={blog?.image} alt={blog?.title} className="w-full h-full object-cover object-center" />
									</div>
									<div className="my-4">
										<p className="text-sm leading-relaxed">{blog?.description?.paragraph1}</p>
										<p className="mt-4 text-sm leading-relaxed">{blog?.description?.paragraph2}</p>
										<p className="mt-4 text-sm leading-relaxed">{blog?.description?.paragraph3}</p>
									</div>
								</div>
							</div>

							{/* <div className="flex-shrink-0 md:w-64 lg:w-80">
								<h3 className="text-2xl">More Blogs</h3>
							</div> */}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default BlogDetail;
