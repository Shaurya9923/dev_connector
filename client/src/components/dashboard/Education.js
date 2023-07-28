import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';


const Education = ({education, deleteEducation}) => {
    const mytableth = {
        padding: "1rem 0",
        textAlign: "center",
        width: "25%",
      };
    const educations = education.map(edu=>(
        <tr key={edu._id}>
            <td style={mytableth}>{edu.school}</td>
            <td style={mytableth} className="hide-sm">{edu.degree}</td>
            <td style={mytableth} className="hide-sm"><Moment format='YYYY/MM/DD'>{edu.from}</Moment>-
            {' '}{edu.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)}
            </td>
            <td  onClick={()=>{deleteEducation(edu._id)}}style={mytableth}><button className='btn btn-danger'>Delete</button></td>
        </tr>
        
    ))
    return (
        <Fragment>
            <h2 className = "my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th style={mytableth}>School</th>
                        <th style={mytableth} className="hide-sm">Degree</th>
                        <th style={mytableth} className="hide-sm">Years</th>
                        <th style={mytableth} className="hide-sm">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    );
};


Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};


export default connect(null, {deleteEducation})(Education);
