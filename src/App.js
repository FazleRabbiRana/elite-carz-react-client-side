import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login/Login';
import AllProducts from './Pages/AllProducts/AllProducts';
import AllBlogs from './Pages/AllBlogs/AllBlogs';
import BlogDetail from './Pages/BlogDetail/BlogDetail';

function App() {
  return (
    <AuthProvider>
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
          <Route path="/all-blogs">
            <AllBlogs />
          </Route>
          <Route path="/blog/:blogId">
            <BlogDetail />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;
