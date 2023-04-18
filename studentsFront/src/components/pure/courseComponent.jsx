 import React, {useEffect} from 'react';
 import PropTypes from 'prop-types';
 import { CourseModel } from '../../models/course.model'
import { Journeys } from '../enums/journeys.enums'
import { Link } from 'react-router-dom';
 
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
        <tr className='fw-normal'>
            <th>
                <span className='ms-2'> {course.name} </span> 
            </th>
            <td className='align-middle'>
                {scheduleIcon()}
            </td>
            <td className='align-middle'>
                <span > {course.start_date} </span>
            </td>
            <td className='align-middle'>
                <span > {course.end_date} </span>
            </td>
            <td className='align-middle'>
                <span > {course.related_students_number} </span>
            </td>            
            <td className='align-middle'>
                <span > 
                    {/* <Link title='Update' to={`/edit/${course.id}`} className='bi bi-pencil-square'></Link>    */}
                    <i title='Update Course' onClick={() => update(course)} className="bi bi-pencil-square course-action" style={{color: 'blue'}}></i> &nbsp; &nbsp;
                    <i title='Delete Course' onClick={() => remove(course)} className="bi bi-trash course-action" style={{color: 'tomato'}}></i>                </span> 
            </td>
        </tr>
    );
 };
  
 
 export default CourseComponent;
 