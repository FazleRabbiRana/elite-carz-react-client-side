import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login/Login';
import AllProducts from './Pages/AllProducts/AllProducts';
import AllBlogs from './Pages/AllBlogs/AllBlogs';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import ProductDetail from './Pages/ProductDetail/ProductDetail/ProductDetail';
import ScrollUpButton from "react-scroll-up-button";
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import StartFromTop from './Pages/Shared/StartFromTop/StartFromTop';
import Terms from './Pages/Terms/Terms';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Contact from './Pages/Contact/Contact';

function App() {
  return (
    <AuthProvider>
      <StartFromTop />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/all-products">
            <AllProducts />
          </Route>
          <PrivateRoute path="/product/:productId">
            <ProductDetail />
          </PrivateRoute>
          <Route path="/all-blogs">
            <AllBlogs />
          </Route>
          <Route path="/blog/:blogId">
            <BlogDetail />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/contact">
            <Contact />
          </PrivateRoute>
          <Route path="/terms-conditions">
            <Terms />
          </Route>
          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <ScrollUpButton
          ShowAtPosition={300}
          AnimationDuration={700}
          ContainerClassName="w-12 h-12 bg-red-400 bg-opacity-50 text-white text-2xl flex items-center justify-center text-center fixed bottom-5 cursor-pointer duration-500 ease-in-out"
          style={{right: '-120%', opacity: 0, zIndex: 999}}
          ToggledStyle={{right: '20px', opacity: 1}}
        >
          <HiOutlineChevronDoubleUp />
        </ScrollUpButton>
      </div>
    </AuthProvider>
  );
}

export default App;
