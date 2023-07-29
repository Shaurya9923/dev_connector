import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux' 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
const Register = ({setAlert, register, isAuthenticated}) => {
    const navigate = useNavigate();
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
            setAlert('Password do not match','danger', 3000)
        }else{
            register({name,email,password})

        }
    }
    if(isAuthenticated){
        navigate('/dashboard')
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
            <input type="password" placeholder="Password" name='password' value={password} onChange={e=>onChangeForm(e)}/>
        </div>
        <div className="form-group">
            <input type="password" placeholder="Confirm Password" name='password2' value={password2} onChange={e=>onChangeForm(e)}/>
        </div>
        <input type="submit" value="Register" className="btn btn-primary"/>
      </form>
      <p className="my-1">
        Already have an Account ? <Link to="/login">Sign In</Link>
      </p>
    
    </section></Fragment>)
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);
