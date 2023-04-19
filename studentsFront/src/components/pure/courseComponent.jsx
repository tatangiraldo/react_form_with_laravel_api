 import React, {useEffect} from 'react';
 import PropTypes from 'prop-types';
 import { CourseModel } from '../../models/course.model'
import { Journeys } from '../enums/journeys.enums'
 
 const CourseComponent = ({course, remove, update}) => {

    function scheduleIcon(){
        switch (parseInt(course.schedule)) {
            case Journeys.Morning:
                return(
                    <i className="bi bi-sun">Day</i> 
                ) 
            case Journeys.Afternoon:
                return(
                    <i className="bi bi-sunset-fill">Afternoon</i>
                )  
            case Journeys.Night:
                return(
                    <i className="bi bi-moon-stars">Night</i>
                )            
            default:
                break;
        }
    }

    return (
        <div className='col-12 col-lg-3 col-md-4 mt-3 text-capitalize'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"> {course.name} </h5>
                    <p className="card-text">
                        <span className='fw-bold'>
                            Start date:
                        </span>
                        <br /> {course.start_date} <br />
                        <span className='fw-bold'>
                            End date: 
                        </span>
                        <br />{course.end_date}<br />
                        {scheduleIcon()} 
                        <br />
                        <span className='fw-bold'>Students &nbsp; </span>
                        {course.related_students_number} 
                    </p>
                    <i title='Update Course' onClick={() => update(course)} className="bi bi-pencil-square course-action" style={{color: 'blue'}}></i> &nbsp; &nbsp;
                    <i title='Delete Course' onClick={() => remove(course)} className="bi bi-trash course-action" style={{color: 'tomato'}}></i>
                </div>
            </div>

        </div>
    );
 };
  
 
 export default CourseComponent;
 