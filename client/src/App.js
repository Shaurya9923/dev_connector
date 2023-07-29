import './App.css';
import { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter as Router,Route, Routes, useLocation, useParams } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';


if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = ()=>{
   useEffect(()=>{
    store.dispatch(loadUser())
   }, [])
  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Routes><Route exact path="/" element={<Landing/>} /></Routes>
          <Alert/>
          <Routes>
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/profiles" element={<Profiles/>} />
                <Route exact path="/profile/:id" element={<Profile/>} />
                <Route exact path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
                <Route exact path="/create-profile" element={<PrivateRoute> <CreateProfile/> </PrivateRoute>} />
                <Route exact path="/edit-profile" element={<PrivateRoute> <EditProfile/> </PrivateRoute>} />
                <Route exact path="/add-experience" element={<PrivateRoute> <AddExperience/> </PrivateRoute>} />
                <Route exact path="/add-education" element={<PrivateRoute> <AddEducation/> </PrivateRoute>} />
                <Route exact path="/posts" element={<PrivateRoute> <Posts/> </PrivateRoute>} />
                <Route exact path="/posts/:id" element={<PrivateRoute> <Post/> </PrivateRoute>} />
          </Routes>    
        {/* <Landing /> */}
        
      </Fragment>
    </Router>
  </Provider>
  )};

export default App;
