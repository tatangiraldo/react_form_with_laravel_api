import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert';
import Modal from 'react-bootstrap/Modal';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CourseModel } from '../../models/course.model'
import CourseComponent from '../pure/CourseComponent'
import CourseForm from '../pure/forms/courseForm'
import '../../styles/course.scss'

function CourseListComponent() {

    //status of component
    const [courses, setCourses] = useState([]);
    const [tmpUpdateCourse, setTmpUpdateCourse] = useState(new CourseModel());
    const [seeTopCourses, setTopCourses] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () =>  setShow(false);
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(true);

    const endPoint = 'http://localhost:8000/api'


    useEffect(() => {        
        getCourses();
    }, [seeTopCourses]);

    const showMessage = (message) => {
        alert(message);
    }

    /**
     * Get all courses
     */
    const getCourses = async() => {       
        
        let url = `${endPoint}/courses`
        if(seeTopCourses) {
            url = `${endPoint}/courses/topCourses`
        }

        const request = await axios.get(url)

        if(request?.data && request.data.code === 200){
            setCourses(request.data.data);
        }else{
            showMessage(request.data.message);
        }
        setLoading(false);
    }

    /**
     * Get all courses without filters
     */
    const getAllCourses = () => {
        setLoading(true);
        setCourses([]);
        setTopCourses(0);
        getCourses()
    }

    /**
     * Get top courses
     */
    const getTopCourses = () => {
        setLoading(true);
        setCourses([]);
        setTopCourses(1);
        getCourses()
    }

    /**
     * Confirm to delete course
     */
    const confirmDeleteCourse = (course) =>{
        
        confirmAlert({
            title: 'Delete course ?',
            message: `¿Do you want to delete ${course.name} ?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteCourse(course)
              },
              {
                label: 'No',
              }
            ]
          });
    }

     /**
     * Delete a course
     */
     const deleteCourse = async(course) => {        
        
        setLoading(true)
        const request = await axios.delete(`${endPoint}/course/${course.id}`)
        if(request?.data && request.data.code === 200){
            
            const index = courses.indexOf(course)
            const tempCourses = [...courses]
            tempCourses.splice(index, 1)
            setCourses(tempCourses)
            setLoading(false)

        }else{
            showMessage(request.data.message);
        }
    }

    /**
     * Create a course
     */
    const addCourse = async(course) => {
        setLoading(true)
        const request = await axios.post(`${endPoint}/course`, course)
        if(request?.data && request.data.code === 200){
            const tempCourses = [...courses]
            tempCourses.push(request.data.data)
            setCourses(tempCourses)
            handleClose()
            setLoading(false)
        }else{
            showMessage(request.data.message);
        }
    }

    /**
     * Update a course
     */
    const updateCourse = async(course) => {
        setLoading(true);
        const request = await axios.put(`${endPoint}/course/${course.id}`, course)
        if(request?.data && request.data.code === 200){                   
            //const tempCourses = [...courses]
            const tempCourses = [...courses].map((c) => { 
                if(c.id === course.id){
                    c = course
                }
                return c
            })

            setCourses(tempCourses)
            handleClose()
            setLoading(false);

        }else{
            showMessage(request.data.message);
        }
    }

    /**
     * Open modal to update course
     */
    const enableUpdateCourse = (course) => {        
        handleShow();
        setTmpUpdateCourse(course)
    }
        
    return (
        <div className="container bg-white p-3">
            <div className='row'>
                <div className='col-12'>
                    {
                        (loading) &&
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    <h5>
                       <span className='float-start'> Course list: </span>
                        {
                            (seeTopCourses === 0 ) &&
                            <div>
                                <button className='float-end btn btn-light btn-sm' onClick={getTopCourses}>
                                    <i className="bi bi-filter"></i>
                                    Get Top Courses
                                </button>
                                <button className='float-end btn btn-primary btn-sm me-3 ' onClick={handleShow}>New Course</button>
                            </div>
                        }
                        {
                            (seeTopCourses === 1) &&
                            <button className='float-end btn btn-light btn-sm' onClick={getAllCourses}>Get All Courses</button>
                        }
                    </h5>                         
                </div>
                <div className='col-12'>
                    <div className='row'>
                        {
                            courses.map( (course, index) => {
                                return (
                                    <CourseComponent 
                                        key={index} 
                                        course={course}
                                        remove={confirmDeleteCourse}
                                        update={enableUpdateCourse}
                                    />
                                )
                            })
                        }
                        { 
                            (courses.length === 0) &&
                            <p className='text text-danger'>There are not courses created</p>
                        }
                    </div>
                </div>                
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Courses Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CourseForm 
                        add={addCourse}
                        existCourse={tmpUpdateCourse}
                        update={updateCourse}
                        />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CourseListComponent

