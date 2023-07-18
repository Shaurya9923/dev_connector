import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2:''
    })
    const {name,email,password, password2} = formData;
    const onChangeForm = e=> setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmitForm = async e=>{
        e.preventDefault();
        if(password !== password2){
            console.log('Password do not match')
        }else{
            console.log('Success')
        }
    }
    return (<Fragment>
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i>Create your Account</p>
      <form className="form" onSubmit={e=>onSubmitForm(e)}>
        <div className="form-group">
            <input type="text" placeholder="Name" name='name' value={name}  onChange={e=>onChangeForm(e)}  />
        </div>
        <div className="form-group">
            <input type="email" placeholder="Email Address" name='email' value={email} onChange={e=>onChangeForm(e)}/>
            <small className="form-text">This site uses Gravatar, so if you want a profile image, use a Gravatar email</small>
        </div>
        <div className="form-group">
            <input type="password" placeholder="Password" minLength="6" name='password' value={password} onChange={e=>onChangeForm(e)}/>
        </div>
        <div className="form-group">
            <input type="password" placeholder="Confirm Password" minLength="6" name='password2' value={password2} onChange={e=>onChangeForm(e)}/>
        </div>
        <input type="submit" value="Register" className="btn btn-primary"/>
      </form>
      <p className="my-1">
        Already have an Account ? <Link to="/login">Sign In</Link>
      </p>
    </section>
    </Fragment>)
}

export default Register;
