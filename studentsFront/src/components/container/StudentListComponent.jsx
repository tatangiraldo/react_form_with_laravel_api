import { useState } from "react";
import { StudentModel } from "../../models/student.model";
import StudentComponent from "../pure/StudentComponent";
import StudentForm from "../pure/forms/studentForm";

function StudentListComponent(props){
    
    const student = new StudentModel(
        'Jhonnatan',
        'Giraldo',
        'jon@gmail.co',
        false
    )

    function setStudentStatus(student){
        debugger;
        //encuentra el indice del estudiante
        const index = students.indexOf(student)
        //crea un array temp de estudiantes
        const tempStudents = [...students]
        tempStudents[index].conected = !tempStudents[index].conected;
        setStudents(tempStudents);
    }

    function addStudent(student){
        //crea un array temp de estudiantes
        const tempStudents = [...students]
        tempStudents.push(student)
        setStudents(tempStudents)
    }

    function removeStudent(student){
        const index = students.indexOf(student)
        const tempStudents = [...students]
        tempStudents.splice(index, 1)
        setStudents(tempStudents)
    }

    const [students, setStudents] = useState([student]);

    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header p-3'>
                        <h5>Students: </h5>
                    </div>
                    <div className='card-body' data-mdb-perfect-scrollbar={true} style={{position:'relative'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Last Name</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Status</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                students.map( (student, index) => {
                                    return(
                                        <StudentComponent 
                                            key={index}
                                            student={student}
                                            remove = {removeStudent}
                                            setSatus={setStudentStatus}
                                        />
                                    )
                                })
                            }                            
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>
            <StudentForm
                add={addStudent}
             />
        </div>
    )
}

export default StudentListComponent;