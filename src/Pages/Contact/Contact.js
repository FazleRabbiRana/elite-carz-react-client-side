import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import useAuthContexts from '../../hooks/useAuthContexts';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';
import Footer from '../Shared/Footer/Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingStatus from '../Shared/LoadingStatus/LoadingStatus';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const Contact = () => {
	const { user } = useAuthContexts();
	const [isSending, setIsSending] = useState(false);

	// send email 
	const handleSubmit = e => {
		e.preventDefault();
		setIsSending(true);

		emailjs.sendForm('elite_carz_contact', 'template_37ricua', e.target, 'user_qDHnY1Xeahm2s2entONX8')
      .then((res) => {
        // console.log(res);
				if (res.status === 200) {
					setIsSending(false);
					e.target.reset();
					MySwal.fire({
						icon: 'success',
						title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Email sent successfully!</span>`,
						confirmButtonText: `OK`,
						buttonsStyling: false,
						customClass: {
							confirmButton: 'btn-regular py-2',
						},
					});
				}
      })
			.catch(err => {
				console.log(err);
				MySwal.fire({
					icon: 'error',
					title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Failed! Please try again</span>`,
					confirmButtonText: `OK`,
					buttonsStyling: false,
					customClass: {
						confirmButton: 'btn-regular py-2',
					},
				});
			})
			.finally(() => setIsSending(false));
	}

	return (
		<>
			<HeaderNavbar />
			<main id="contact_page" className="contact-page pt-16 md:pt-20">
				<section className="py-8 lg:py-12">
					<div className="container">
						<div className="contact-form-area flex flex-col md:flex-row-reverse md:justify-center">
							<div className="contact-details flex-initial md:pl-12 lg:pl-24 mb-12 md:mb-0">
								<h3 className="text-xl mb-8">Get in <span className="text-my-secondary">touch</span></h3>
								<div className="mt-8">
									<h4 className="mb-2 tracking-normal">Address</h4>
									<p className="text-sm">
										Elite Carz Showroom, <br /> 
										Bheramara-7040, Kushtia, <br />
										Bangladesh.
									</p>
								</div>
								<div className="mt-8">
									<h4 className="mb-2 tracking-normal">Email</h4>
									<p className="text-sm">
										<a href="mailto:demo@dummy.com">help@elite-carz.com</a>
									</p>
								</div>
								<div className="mt-8">
									<h4 className="mb-2 tracking-normal">Phone</h4>
									<p className="text-sm">
										<a href="tel:+12029007178">+1 (202) 900 7178</a>
									</p>
								</div>
							</div>
							
							<div className="contact-form md:w-1/2 lg:w-2/5">
								<h3 className="text-xl mb-8">Let's <span className="text-my-secondary">talk</span></h3>
								<form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col space-y-5">
									<input type="text" name="sender_name" required placeholder="Name *" className="contact-form-input" value={user?.displayName} readOnly />
									<input type="email" name="sender_email" required placeholder="Email address *" className="contact-form-input" value={user?.email} readOnly />
									<input type="tel" name="sender_phone" placeholder="Your mobile number" className="contact-form-input" />
									<textarea name="sender_message" required placeholder="Message *" className="contact-form-input h-40 p-4"></textarea>
									{isSending ? <LoadingStatus /> : <button type="submit" className="btn-regular">Send</button>}
									{/* <button type="submit" className="btn-regular">Send</button> */}
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Contact;