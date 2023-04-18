import React, {useState, useEffect} from 'react'
import { Journeys } from '../enums/journeys.enums'
import { CourseModel } from '../../models/course.model'
import CourseComponent from '../pure/courseComponent'
import CourseForm from '../pure/forms/courseForm'
import '../../styles/course.scss'

function CoursesListComponent() {

    const defaultCourse = new CourseModel(
        'Example', 
        'Default Desc',
        true,
        Journeys.Morning
        );
    
    const defaultCourse2 = new CourseModel(
        'Example2', 
        'Default  2',
        false,
        Journeys.Afternoon
        );
    
    const defaultCourse3 = new CourseModel(
        'Example3', 
        'Default  3',
        false,
        Journeys.Night
        );


    //status of component
    const [courses, setCourses] = useState([defaultCourse, defaultCourse2, defaultCourse3]);
    const [loading, setLoading] = useState(true);

    //cycle life component control
    useEffect(() => {
        console.log('Course state has been modified')
        setLoading(false);
        return () => {
            console.log('Course list component is going to unMount')
        };
    }, [courses]);
        
    function completeCourse(course){
        //encuentra el indice de el curso
        const index = courses.indexOf(course)
        //crea un array temporal de cursos
        const tempCourses = [...courses]
        //modifica el curso en el array temporal
        tempCourses[index].completed = !tempCourses[index].completed;
        //actualiza el array de cursos original con la informacion modificada,
        // y con ello la vista
        setCourses(tempCourses);

    }

    function removeCourse(course){
        //encuentra el indice de el curso
        const index = courses.indexOf(course)
        //crea un array temporal de cursos
        const tempCourses = [...courses]
        tempCourses.splice(index, 1)
        setCourses(tempCourses)
    }

    function addCourse(course){
        const tempCourses = [...courses]
        tempCourses.push(course)
        setCourses(tempCourses)
    }

        
    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header p-3'>
                        <h5>Your Courses: </h5>
                    </div>
                    <div className='card-body' data-mdb-perfect-scrollbar={true} style={{position:'relative'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Journey</th>
                                    <th scope='col'>Start Date</th>
                                    <th scope='col'>End Date</th>
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
                                                complete={completeCourse}  
                                                remove={removeCourse}
                                            />
                                        )
                                    })
                                }
                            
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>
            <CourseForm add={addCourse}/>
        </div>
    )
}


export default CoursesListComponent

