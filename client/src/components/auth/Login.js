import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email,password} = formData;
    const onChangeForm = e=> setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmitForm = async e=>{
        e.preventDefault();
        console.log('Success')
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
    </section>
    </Fragment>)
}

export default Login;
