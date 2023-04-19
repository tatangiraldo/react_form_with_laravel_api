import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert';
import Modal from 'react-bootstrap/Modal';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Select from 'react-select'

import { StudentModel } from "../../models/student.model";
import StudentComponent from "../pure/StudentComponent";
import StudentForm from "../pure/forms/studentForm";

function StudentListComponent(props){
    
    //status of component
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [tmpUpdateStudent, setTmpUpdateStudent] = useState(new StudentModel());
    const [assignStudentCourse, setAssignStudentCourse] = useState(new StudentModel());
    
    const [dataSelectCourses, setDataSelectCourses] = useState([]);
    const courseRef = useRef(null);

    const [show, setShow] = useState(false);
    const handleClose = () =>  setShow(false);
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(true);

    const endPoint = 'http://localhost:8000/api'

    useEffect(() => {
        
        setLoading(false);
        getAllCourses();
        getAllStudents();

    }, [courses]);

    const showMessage = (message) => {
        alert(message);
    }

    /**
     * Get all courses
     */
    const getAllCourses = async() => {
        if(courses?.length === 0 ){
            const  request = await axios.get(`${endPoint}/courses`)
            if(request?.data && request.data.code === 200){
                const dataForSelect = request.data.data.map(function(course){ 
                    return {
                        'value': course.id,
                        'label': course.name
                    }
                });
                setDataSelectCourses(dataForSelect);

                setCourses(request.data.data);
            }else{
                showMessage(request.data.message);
            }
        }
    }

    /**
     * Get all students
     */
    const getAllStudents = async() => {
        if(students?.length === 0 ){
            const request = await axios.get(`${endPoint}/students`)
            if(request?.data && request.data.code === 200){
                setStudents(request.data.data.students)
                setCourses(request.data.data.courses)
            }else{
                showMessage(request.data.message)
            }
        }
    }

    const confirmDeleteStudent = (student) =>{
        
        confirmAlert({
            title: 'Delete student ?',
            message: `¿Do you want to delete ${student.name} ${student.last_name} ?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteStudent(student)
              },
              {
                label: 'No',
              }
            ]
          });
    }

    /**
     * Delete a student
     */
    const deleteStudent = async(student) => {        
        
        const request = await axios.delete(`${endPoint}/student/${student.id}`)
        if(request?.data && request.data.code === 200){
            
            const index = students.indexOf(student)
            const tempStudents = [...students]
            tempStudents.splice(index, 1)
            setStudents(tempStudents)

        }else{
            showMessage(request.data.message);
        }
    }

    const addStudent = async(student) => {
        const request = await axios.post(`${endPoint}/student`, student)
        if(request?.data && request.data.code === 200){
            const tempStudents = [...students]
            tempStudents.push(request.data.data)
            setStudents(tempStudents)
            handleClose();
        }else{
            showMessage(request.data.message);
        }
    }

    const updateStudent = async(student) => {
        
        const request = await axios.put(`${endPoint}/student/${student.id}`, student)
        if(request?.data && request.data.code === 200){                   
            const tempStudents = [...students].map((c) => { 
                if(c.id === student.id){
                    c = student
                }
                return c
            })

            setStudents(tempStudents)
            handleClose()

        }else{
            showMessage(request.data.message);
        }
    }

     /**
     * Unassign a student course
     */
     const unassignStudentCourse = async(student, course) => {        
         let data = {
             'studentId': student.id,
             'courseId': course.id
            }
        const request = await axios.post(`${endPoint}/student/unassignCourse/`, data)
        if(request?.data && request.data.code === 200){
            //search student's courses
            const tempStudents = [...students].map((st) => { 
                if(st.id === student.id){
                    const indexCourse = st.courses.indexOf(course)
                    st.courses.splice(indexCourse, 1)
                }
                return st
            })
            setStudents(tempStudents)
        }else{
            showMessage(request.data.message);
        }
    }

     /**
     * Assign a student course
     */
     const assignCourse = async(e) => {      
        e.preventDefault();  
        let selectVal = courseRef.current.getValue();
        let data = {
            'studentId': assignStudentCourse.id,
            'courseId': selectVal[0].value
           }

       const request = await axios.post(`${endPoint}/student/assignCourse/`, data)
       if(request?.data && request.data.code === 200){

            //search student's courses
            const tempStudents = [...students].map((st) => { 
                if(st.id === assignStudentCourse.id){
                    
                    const newCourse = courses.find(function(cs){ 
                        return cs.id === selectVal[0].value
                    })
                    if(!st.courses) {
                        st.courses = [];
                    }
                    st.courses?.push(newCourse)
                }
                return st
            })
            handleClose();
            setStudents(tempStudents) 
        
       }else{
           showMessage(request.data.message);
       }
   }

    const enableUpdateStudent = (student) => {
        if(student.id){
            setTmpUpdateStudent(student)
        }
        setAssignStudentCourse(new StudentModel())
        handleShow();
    }

    const enableAssignCourse = (student) => {
    
        setTmpUpdateStudent(new StudentModel())
        setAssignStudentCourse(student)
        handleShow();
    }

    /************************************/

    return (
        <div className='container bg-white p-3'>
            <div className='col-12'>
                
                <div className=''>
                    <h5>
                        <span className='float-start'> Student List:  </span>
                        <button className='btn btn-primary btn-sm float-end' onClick={enableUpdateStudent}>New Student</button>
                    </h5>
                    { 
                    (students.length > 0) &&
                        <div data-mdb-perfect-scrollbar={true} >
                            <table   className="table">
                                <thead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Last Name</th>
                                        <th scope='col'>Age</th>
                                        <th scope='col'>Address</th>
                                        <th scope="col">Related Curses</th>
                                        <th scope="col">Assign new Course</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>                            
                                {
                                    students.map( (student, index) => {
                                        return(
                                            <StudentComponent 
                                                key={index}
                                                student={student}
                                                remove = {confirmDeleteStudent}
                                                update={enableUpdateStudent}
                                                assignCourse={enableAssignCourse}
                                                unassignCourse={unassignStudentCourse}
                                            />
                                        )
                                    })
                                }                           
                            </table>
                        </div>
                    }
                    { 
                    (students.length === 0) &&
                        <p className='text text-danger'>There are not students created</p>
                    }
                </div>               
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    { (!assignStudentCourse.id) ? 'Student Registration' : 'Assign course' }
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        assignStudentCourse.id && 
                        <form onSubmit={assignCourse} className="align-items-center mb-4">
                            <br></br>
                            <div className="mb-3">
                                <label htmlFor="course" className="form-label">Select Course</label>
                                <Select 
                                   ref={courseRef} 
                                   options={dataSelectCourses} />
                            </div>
                            <button type='submit' className='btn btn-primary ms-3 float-end'>
                                Assign Course
                            </button>
                        </form>

                        
                    }
                    {
                        !assignStudentCourse.id && 
                        <StudentForm
                            add={addStudent}
                            existStudent={tmpUpdateStudent}
                            update={updateStudent}
                        />
                    }

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default StudentListComponent;