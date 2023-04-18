import React, {useRef} from 'react';
import PropTypes from 'prop-types'
import { Journeys } from '../../enums/journeys.enums';
import {CourseModel} from '../../../models/course.model'

const CourseForm = ({add}) => {

    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const levelRef = useRef(Journeys.Morning);

    function addCourse(e){
        e.preventDefault();
        const newCourse = new CourseModel(
            nameRef.current.value,
            descriptionRef.current.value,
            false,
            levelRef.current.value
        )
        add(newCourse);
    }

    return (
        <form onSubmit={addCourse} className="d-flex justify-content-center align-items-center mb-4">
           <div className='form-outline flex-fill'>
                <input className='form-control form-control-lg' ref={nameRef} id="inputName" type="text" required placeholder='Name' autoFocus />
                <input className='form-control form-control-lg' ref={descriptionRef} id="inputDescription" type="text" required placeholder='Description' />
                <label htmlFor='selectLevel' className='sr-only'> Priority </label>
                <select id="selectLevel" ref={levelRef} defaultValue={Journeys.Morning}>
                    <option value={Journeys.Morning}> Día </option>
                    <option value={Journeys.Afternoon}> Tarde </option>
                    <option value={Journeys.Night}> Noche </option>
                </select>
                <button type='submit' className='btn btn-success btn-lg ms-3'  >Add</button>

           </div>
        </form>
    );
}

CourseForm.propTypes = {
    add: PropTypes.func
}
export default CourseForm;
