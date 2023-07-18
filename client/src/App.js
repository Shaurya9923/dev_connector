import './App.css';
import { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
const App = ()=> (
  <Router>
    <Fragment>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={<Landing/>} />
    
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
    </Routes>    
      
      {/* <Landing /> */}
      
    </Fragment>
  </Router>
  );

export default App;
