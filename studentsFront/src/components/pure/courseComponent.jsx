 import React, {useEffect} from 'react';
 import PropTypes from 'prop-types';
 import { CourseModel } from '../../models/course.model'
import { Journeys } from '../enums/journeys.enums'
 
 const CourseComponent = ({course, complete, remove}) => {

        useEffect(() => {
            console.log('Created course')
            return () => {
                console.log( `course: ${course.name} is going to unMount` )
            };
        }, [course]);

        /**
         * Function that return a html Badge depending of course's level
         */
        function courseLevelBadge(){
            switch (course.level) {
                case Journeys.Morning:
                    return(
                        <h6 className='mb-o'>
                            <span className='badge bg-primary'>
                                {course.level}
                            </span>
                        </h6>
                    ) 
                case Journeys.Afternoon:
                    return(
                        <h6 className='mb-o'>
                            <span className='badge bg-warning'>
                                {course.level}
                            </span>
                        </h6>
                    )  
                case Journeys.Night:
                    return(
                        <h6 className='mb-o'>
                            <span className='badge bg-danger'>
                                {course.level}
                            </span>
                        </h6>
                    )            
                default:
                    break;
            }
        }

        /**
         * 
         */
        function courseInconManagement(){
            if(course.completed){
                    // onClick={ () => complete(course) } ->asi se carga solo con el click
                    // onClick={ complete(course) } ->  Asi se ejecuta apenas cargue el componente
                    //this method complete is in the parent component (course list)
                return (<i onClick={() => complete(course)} className="bi bi-toggle-on course-action" style={{color: 'green'}}></i>) 
            }
            return (<i onClick={() => complete(course)} className="bi bi-toggle-off course-action "  style={{color: 'grey'}}></i>)
        }

    return (
        <tr className='fw-normal'>
            <th>
                <span className='ms-2'> {course.name} </span> 
            </th>
            <td className='align-middle'>
                <span > {course.description} </span>
            </td>
            <td className='align-middle'>
                <span >
                    {courseLevelBadge()}
                </span>
            </td>
            <td className='align-middle'>
                <span > 
                    {courseInconManagement()}
                    <i onClick={() => remove(course)} className="bi bi-trash course-action" style={{color: 'tomato'}}></i>
                </span> 
            </td>
        </tr>
    );
 };
 
 
 CourseComponent.propTypes = {
    course: PropTypes.instanceOf(CourseModel).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
 };
 
 
 export default CourseComponent;
 