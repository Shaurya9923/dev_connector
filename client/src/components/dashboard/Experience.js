import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';


const Experience = ({experience, deleteExperience}) => {
    const mytableth = {
        padding: "1rem 0",
        textAlign: "center",
        width: "25%",
      };
    console.log(experience)
    const experiences = experience.map(exp=>(
        <tr key={exp._id}>
            <td style={mytableth}>{exp.company}</td>
            <td style={mytableth} className="hide-sm">{exp.title}</td>
            <td style={mytableth} className="hide-sm"><Moment format='YYYY/MM/DD'>{exp.from}</Moment>-
            {' '}{exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
            </td>
            <td onClick={()=>deleteExperience(exp._id)} style={mytableth}><button className='btn btn-danger'>Delete</button></td>
        </tr>
        
    ))
    return (
        <Fragment>
            <h2 className = "my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th style={mytableth}>Company</th>
                        <th style={mytableth} className="hide-sm">Title</th>
                        <th style={mytableth} className="hide-sm">Years</th>
                        <th style={mytableth} className="hide-sm">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    );
};


Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};


export default connect(null,{deleteExperience})(Experience);
