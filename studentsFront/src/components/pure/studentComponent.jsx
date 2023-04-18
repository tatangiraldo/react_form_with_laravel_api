import PropTypes from 'prop-types';
import { StudentModel } from '../../models/student.model';

const StudentComponent = ({student, setSatus, remove}) => {

    function statusBadge(){
        switch (student.conected) {
            case true:
                return (<i onClick={() => setSatus(student)} className="bi bi-toggle-on course-action" style={{color: 'green'}}></i>)
            default:
                return (<i onClick={() => setSatus(student)} className="bi bi-toggle-off course-action" style={{color: 'grey'}}></i>)
        }
    }

    return (
        <tr className='fw-normal'>
            <th>
                <span className='ms-2'>{ student.name } </span> 
            </th>
            <th>
                <span className='ms-2'> { student.lastName } </span> 
            </th>
            <td className='align-middle'>
                <span > { student.email } </span>
            </td>
            <td className='align-middle'>
                <span >
                    {statusBadge()}
                </span>
            </td>
            <td className='align-middle'>
                <i onClick={() => remove(student)} className="bi bi-trash course-action" style={{color: 'red'}}></i>
            </td>
        </tr>
    );
};

StudentComponent.propTypes = {
    student : PropTypes.instanceOf(StudentModel)
}

export default StudentComponent;