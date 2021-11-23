import axios from 'axios';
import React, { useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AOS from 'aos';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const MyOrder = ({ order, orders, setOrders, index }) => {
	const { name, image, price } = order?.orderedProduct;
	const { status } = order;

	// handle remove order
	const handleRemoveOrder = id => {
		// return if already completed order
		if (status.toLowerCase() === 'shipped') {
			MySwal.fire({
				icon: 'warning',
				title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Can't remove.</span>`,
				html: `<p class="text-sm">Order already completed!</p>`,
				confirmButtonText: `OK`,
				buttonsStyling: false,
				customClass: {
					confirmButton: 'btn-regular py-2',
				},
			});
			return;
		}

		// process remove order
		MySwal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			html: `<span class="text-sm">You won't be able to revert this!</span>`,
			confirmButtonText: 'Yes, delete',
			showCancelButton: true,
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn-regular bg-red-500 py-2 mr-4',
				cancelButton: 'btn-regular py-2',
			},
		}).then(result => {
			if (result.isConfirmed) {
				const url = `https://sheltered-caverns-44637.herokuapp.com/orders/${id}`;
				axios
					.delete(url)
					.then(res => {
						// console.log(res);
						if (res.data.deletedCount) {
							const remaining = orders.filter(order => order._id !== id);
							setOrders(remaining);
							MySwal.fire({
								icon: 'success',
								title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Order DELETED successfully!</span>`,
								confirmButtonText: `OK`,
								buttonsStyling: false,
								customClass: {
									confirmButton: 'btn-regular py-2',
								},
							});
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		});
	};

	// initialize aos plugin
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div 
			className="single-order-block bg-gray-100 group flex flex-nowrap justify-between lg:max-w-lg"
			data-aos="fade-up" 
			data-aos-duration="700" 
			data-aos-delay={`${index * 100 + 50}`}
			data-aos-once="true"
			data-aos-anchor-placement="top-bottom"
		>
			<div className="image flex-shrink-0 w-20 sm:w-28 md:w-36 overflow-hidden">
				<img src={image} alt={name} className="w-full h-full object-cover object-center" />
			</div>
			<div className="flex-grow py-1 px-2 font-my-title text-sm md:text-base">
				<h4 className="font-normal text-base md:text-lg">{name}</h4>
				<p className="sm:block">&#36;{price}</p>
				<p className="sm:block">Status: {status}</p>
			</div>
			<div className="flex-shrink-0 flex items-center">
				<button 
					onClick={() => handleRemoveOrder(order._id)} 
					className={status.toLowerCase() === 'shipped' ? 'm-1 md:m-2 opacity-40' : 'm-1 md:m-2'}
					// disabled={status.toLowerCase() === 'shipped' ? true : false}
				>
					<RiCloseCircleLine className="text-2xl text-red-500 hover:text-red-700" />
				</button>
			</div>
		</div>
	);
};

export default MyOrder;
