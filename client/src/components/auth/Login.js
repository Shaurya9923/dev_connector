import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
const Login = ({login,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const {email,password} = formData;
    const onChangeForm = e=> setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmitForm = async e=>{
        e.preventDefault();
        console.log(email, password);
        login({email,password})
    }
    // Redirect if Logged in
    console.log(isAuthenticated + "isAuthenticated")
    if(isAuthenticated){
      navigate('/dashboard')
    }
    return (<Fragment>
      <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i>Sign Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmitForm(e)}>
        <div className="form-group">
            <input type="email" placeholder="Email Address" name='email' value={email} onChange={e=>onChangeForm(e)}/>
        </div>
        <div className="form-group">
            <input type="password" placeholder="Password" minLength="6" name='password' value={password} onChange={e=>onChangeForm(e)}/>
        </div>
        <input type="submit" value="Login" className="btn btn-primary"/>
      </form>
      <p className="my-1">
        Don't have an Account ? <Link to="/register">Sign Up</Link>
      </p>
    </section></Fragment>)
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);
