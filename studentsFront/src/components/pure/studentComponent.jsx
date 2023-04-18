import PropTypes from 'prop-types';
import { StudentModel } from '../../models/student.model';
import '../../styles/course.scss'

const StudentComponent = ({student, remove, update, assignCourse, unassignCourse}) => {

    function iconRelatedCourses(){
        
        if (student.courses.length > 0) {
            return (<span>{student.courses.length }<i className="bi bi-emoji-smile course-action" style={{color: 'green'}}></i></span>)
        }
        return (<span>0<i className="bi bi-emoji-frown course-action" style={{color: 'grey'}}></i></span>)
    }

    return (
        <tbody>
            <tr className='fw-normal infoRow'>
                <td>
                    <span className='ms-2'>{ student.name } </span> 
                </td>
                <td>
                    <span className='ms-2'> { student.last_name } </span> 
                </td>
                <td className='align-middle'>
                    <span > { student.age } </span>
                </td>
                <td className='align-middle'>
                    <span > { student.address } </span>
                </td>
                <td className='align-middle'>
                    <span >
                        {iconRelatedCourses()}
                    </span>
                </td>
                <td className='align-middle'>
                    <i title='Assign Course' onClick={() => assignCourse(student)} className="bi bi-bag-plus-fill course-action" style={{color: 'blue'}}></i> &nbsp; &nbsp;
                    <i title='Update Student' onClick={() => update(student)} className="bi bi-pencil-square course-action" style={{color: 'blue'}}></i> &nbsp; &nbsp;
                    <i title='Update Student' onClick={() => remove(student)} className="bi bi-trash course-action" style={{color: 'red'}}></i>
                </td>
            </tr>
            { 
                (student.courses?.length > 0) && 
                <tr className='coursesList'>
                    <td className='text-start' colSpan={5}>   
                        Assigned Courses:
                        {                            
                            student.courses.map( (course, index) => {
                                return(
                                    <button  key={index} type="button" className="btn btn-secondary position-relative btn-sm" style={{marginLeft: '20px'}}>
                                        {course.name}
                                        <span onClick={() => unassignCourse(student, course)} className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle buttonBadge">
                                            <span className=""><i className="bi bi-trash"></i></span>
                                        </span>
                                    </button>
                                )
                            })
                        }
                    </td>
                </tr>
                }
        </tbody>
    );
};

// StudentComponent.propTypes = {
//     student : PropTypes.instanceOf(StudentModel)
// }

export default StudentComponent;