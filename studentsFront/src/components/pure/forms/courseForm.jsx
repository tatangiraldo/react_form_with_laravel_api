import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import { Journeys } from '../../enums/journeys.enums';
import {CourseModel} from '../../../models/course.model'

const CourseForm = ({add, existCourse, update}) => {

    useEffect(() => {    

        //update mode?
        if(existCourse?.id > 0){
            setName(existCourse.name)
            debugger;
            scheduleRef.current.value = existCourse.schedule
            setStart_date(existCourse.start_date)
            setEnd_date(existCourse.end_date)
        }
    }, [existCourse]);

    const [name, setName] = useState('');
    const [start_date, setStart_date] = useState(new Date());
    const [end_date, setEnd_date] = useState(new Date());

    const scheduleRef = useRef(Journeys.Morning);

    function handleCourse(e){
        debugger;
        e.preventDefault();
        const course = new CourseModel(
            0,
            name,
            scheduleRef.current.value,
            start_date,
            end_date,
            0
        )

        //update mode?
        if(existCourse?.id > 0){
            course.id = existCourse.id
            course.related_students_number = existCourse.related_students_number
            update(course)
        }else{
            add(course)
        }
    }

    return (
        <form onSubmit={handleCourse} className="align-items-center mb-4">
           <div className="mb-3">
                <label htmlFor="name" className="form-label">Course Name</label>
                <input 
                    value={name}
                    onChange={ (e) => setName(e.target.value) }
                    className='form-control form-control-lg' 
                    id="name" 
                    type="text" 
                    required placeholder='Name' autoFocus />
            </div>
            <div className="mb-3">
                <label htmlFor='selectLevel' className='form-label'> Schedule </label>
                <select 
                    className="form-select" 
                    aria-label="Default select example" 
                    id="selectLevel" 
                    ref={scheduleRef} 
                    defaultValue={Journeys.Morning}>
                        <option value={Journeys.Morning}> Día </option>
                        <option value={Journeys.Afternoon}> Tarde </option>
                        <option value={Journeys.Night}> Noche </option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input 
                    value={start_date}
                    onChange={ (e) => setStart_date(e.target.value) }
                    className='form-control form-control-lg'  
                    id="startDate" 
                    type="date" 
                    required/>
            </div>
            <div className="mb-3">
                <label htmlFor="date" className="form-label">End Date</label>
                <input 
                    value={end_date}
                    onChange={ (e) => setEnd_date(e.target.value) }
                    className='form-control form-control-lg'  
                    id="date" 
                    type="date" 
                    required/>
            </div>
            <button type='submit' className='btn btn-primary ms-3 float-end'>
              { existCourse?.id > 0 ? 'Update'  : 'Create'  }  Course
            </button>
        </form>
    );
}

CourseForm.propTypes = {
    add: PropTypes.func
}
export default CourseForm;
