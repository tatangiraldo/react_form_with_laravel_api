import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert';
import Modal from 'react-bootstrap/Modal';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Button from 'react-bootstrap/Button';
import { Journeys } from '../enums/journeys.enums'
import {Link} from 'react-router-dom'

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
        
        setLoading(false);
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
    }

    const getAllCourses = () => {        
       
        setCourses([]);
        setTopCourses(0);
        getCourses()
    }

    const getTopCourses = () => {        
       
        setCourses([]);
        setTopCourses(1);
        getCourses()
    }

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
        
        const request = await axios.delete(`${endPoint}/course/${course.id}`)
        if(request?.data && request.data.code === 200){
            
            const index = courses.indexOf(course)
            const tempCourses = [...courses]
            tempCourses.splice(index, 1)
            setCourses(tempCourses)

        }else{
            showMessage(request.data.message);
        }
    }

    const addCourse = async(course) => {
        const request = await axios.post(`${endPoint}/course`, course)
        if(request?.data && request.data.code === 200){
            const tempCourses = [...courses]
            tempCourses.push(request.data.data)
            setCourses(tempCourses)
            handleClose();
        }else{
            showMessage(request.data.message);
        }
    }

    const updateCourse = async(course) => {
        
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

        }else{
            showMessage(request.data.message);
        }
    }

    const enableUpdateCourse = (course) => {
        
        handleShow();
        setTmpUpdateCourse(course)
    }
        
    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header p-3'>
                        <h5>
                            <button className='float-start btn btn-primary btn-sm' onClick={handleShow}>New Course</button>
                            Course list:
                            {
                                (seeTopCourses === 0) &&
                                <button className='float-end btn btn-light btn-sm' onClick={getTopCourses}>
                                    <i class="bi bi-filter"></i>
                                    Get Top Courses
                                </button>
                            }
                            {
                                (seeTopCourses === 1) &&
                                <button className='float-end btn btn-light btn-sm' onClick={getAllCourses}>Get All Courses</button>
                            }
                        </h5>                         
                    </div>
                    <div className='card-body' data-mdb-perfect-scrollbar={true} style={{position:'relative'}}>
                        <table  className="table"> 
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Journey</th>
                                    <th scope='col'>Start Date</th>
                                    <th scope='col'>End Date</th>
                                    <th scope='col'>Enrolled Students </th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
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
                            
                            </tbody>
                        </table>                                
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
                {/* <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button> */}
                {/* <Button variant="primary" onClick={handleClose}>
                    Create course
                </Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    )
}


export default CourseListComponent

