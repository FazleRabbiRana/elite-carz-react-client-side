import React from 'react';
import { Link, NavLink, useRouteMatch, Switch, Route } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import logo from '../../../logo.svg';
import useAuthContexts from '../../../hooks/useAuthContexts';
import {
	RiShoppingCartFill,
	RiMessage2Fill,
	RiSecurePaymentFill,
	RiFileEditFill,
	RiListUnordered,
	RiPlayListAddFill,
	RiUserAddFill,
	RiHome8Fill,
	RiLogoutBoxLine,
} from 'react-icons/ri';
import MyOrders from '../MyOrders/MyOrders';
import AddReview from '../AddReview/AddReview';
import Pay from '../Pay/Pay';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import ManageProducts from '../ManageProducts/ManageProducts';
import AddProduct from '../AddProduct/AddProduct';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';

const Dashboard = () => {
	const { user, isAdmin, logOut } = useAuthContexts();
	let { path, url } = useRouteMatch();

	// dashboard nav link active style
	const linkActiveStyle = {
		background: 'var(--clr-primary)',
		color: 'white',
	};

	return (
		<>
			<header className="dashboard-header navbar static">
				<div className="px-4 w-full flex items-center justify-between">
					<div className="logo-wrapper flex-shrink-0 w-28 md:w-36">
						<Link to="/home">
							<img src={logo} alt="Elite Carz logo" className="w-full" />
						</Link>
					</div>
					<h2 className="flex-grow pl-8 truncate text-gray-400 text-right md:text-center sm:text-lg tracking-normal md:text-xl lg:text-2xl">
						{user?.displayName}
					</h2>
				</div>
			</header>
			<div className="dashboard-wrapper bg-my-yellow-cream min-h-vh-50 flex flex-nowrap space-x-2 md:space-x-4 xl:space-x-10 py-4 lg:py-8">
				<div className="dashboard-sidebar flex-shrink-0 bg-white shadow-my-around py-4 lg:py-8 px-2 lg:px-4 xl:px-6">
					<ul className="dashboard-menu flex flex-col -mt-2">
						{!isAdmin && (
							<>
								<li className="border-b">
									<NavLink
										exact
										to={`${url}`}
										title="My orders"
										activeStyle={linkActiveStyle}
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiShoppingCartFill />
										</span>
										<span className="hidden md:block pl-3">My Orders</span>
									</NavLink>
								</li>
								<li className="border-b">
									<NavLink
										to={`${url}/add-review`}
										title="Review"
										activeStyle={linkActiveStyle}
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiMessage2Fill />
										</span>
										<span className="hidden md:block pl-3">Review</span>
									</NavLink>
								</li>
								<li className="border-b">
									<NavLink
										to={`${url}/pay`}
										title="Pay"
										activeStyle={linkActiveStyle}
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiSecurePaymentFill />
										</span>
										<span className="hidden md:block pl-3">Pay</span>
									</NavLink>
								</li>
							</>
						)}
						{isAdmin && (
							<>
								<li className="border-b">
									<NavLink
										to={`${url}/manage-all-orders`}
										title="Manage all orders"
										activeStyle={linkActiveStyle}
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiFileEditFill />
										</span>
										<span className="hidden md:block pl-3">
											Manage All Orders
										</span>
									</NavLink>
								</li>
								<li className="border-b">
									<NavLink
										to={`${url}/manage-products`}
										title="Manage products"
										activeStyle={linkActiveStyle}
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiListUnordered />
										</span>
										<span className="hidden md:block pl-3">
											Manage Products
										</span>
									</NavLink>
								</li>
								<li className="border-b">
									<NavLink
										to={`${url}/add-product`}
										title="Add a product"
										activeStyle={linkActiveStyle}
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiPlayListAddFill />
										</span>
										<span className="hidden md:block pl-3">Add a Product</span>
									</NavLink>
								</li>
								<li className="border-b">
									<NavLink
										to={`${url}/make-admin`}
										title="Make admin"
										activeStyle={linkActiveStyle}
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiUserAddFill />
										</span>
										<span className="hidden md:block pl-3">Make Admin</span>
									</NavLink>
								</li>
							</>
						)}
						<li className="border-b">
							<NavLink
								to="/home"
								title="Home"
								activeStyle={linkActiveStyle}
								className="dashboard-menu-link"
							>
								<span className="text-2xl">
									<RiHome8Fill />
								</span>
								<span className="hidden md:block pl-3">Home</span>
							</NavLink>
						</li>
						<li>
							<button
								onClick={logOut}
								title="Logout"
								className="dashboard-menu-link"
							>
								<span className="text-2xl">
									<RiLogoutBoxLine />
								</span>
								<span className="hidden md:block pl-3">Logout</span>
							</button>
						</li>
					</ul>
				</div>
				<div className="dashboard-content flex-grow bg-white shadow-my-around py-4 lg:py-8 px-2 lg:px-4 xl:px-6">
					<div className="lg:container m-0 lg:m-0 p-0 lg:p-0">
						<Switch>
							{/* {isAdmin ? (
								<AdminRoute path={`${path}`}>
									<ManageAllOrders />
								</AdminRoute>
							) : (
								<Route exact path={`${path}`}>
									<MyOrders />
								</Route>
							)} */}

							{/* <Route exact path={`${path}`}>
								<MyOrders />
							</Route>
							<Route path={`${path}/add-review`}>
								<AddReview />
							</Route>
							<Route path={`${path}/pay`}>
								<Pay />
							</Route>
							<AdminRoute path={`${path}/manage-all-orders`}>
								<ManageAllOrders />
							</AdminRoute>
							<AdminRoute path={`${path}/manage-products`}>
								<ManageProducts />
							</AdminRoute>
							<AdminRoute path={`${path}/add-product`}>
								<AddProduct />
							</AdminRoute>
							<AdminRoute path={`${path}/make-admin`}>
								<MakeAdmin />
							</AdminRoute> */}

							{!isAdmin && (
								<>
									<Route exact path={`${path}`}>
										<MyOrders />
									</Route>
									<Route path={`${path}/add-review`}>
										<AddReview />
									</Route>
									<Route path={`${path}/pay`}>
										<Pay />
									</Route>
								</>
							)}
							{isAdmin && (
								<>
									<AdminRoute path={`${path}/manage-all-orders`}>
										<ManageAllOrders />
									</AdminRoute>
									<AdminRoute path={`${path}/manage-products`}>
										<ManageProducts />
									</AdminRoute>
									<AdminRoute path={`${path}/add-product`}>
										<AddProduct />
									</AdminRoute>
									<AdminRoute path={`${path}/make-admin`}>
										<MakeAdmin />
									</AdminRoute>
								</>
							)}
						</Switch>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Dashboard;
