import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom'


const PrivateRoute = ({children,auth, ...rest}) => {
    return !auth.isAuthenticated && !auth.loading ? <Navigate to="/login"/> : <>{children}</> 
};


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
