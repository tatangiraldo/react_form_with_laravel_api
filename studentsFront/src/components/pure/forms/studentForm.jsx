import React, { useRef } from 'react';
import { StudentModel } from '../../../models/student.model';

const StudentForm = ({add}) => {
    
    const nameRef = useRef('')
    const lastNameRef = useRef('')
    const emailRef = useRef('')
    
    function addStudent(e){
        e.preventDefault()
        const newStudent = new StudentModel(
            nameRef.current.value,
            lastNameRef.current.value,
            emailRef.current.value,
            true
        )
        add(newStudent)
    }

    return (
        <div>
        <br></br>
        <h2>Create new student</h2>
        <form onSubmit={addStudent} className="d-flex justify-content-center align-items-center mb-4">
        <div className='form-outline flex-fill'>
             <input className='form-control form-control-lg' ref={nameRef} id="inputName" type="text" required placeholder='Name' autoFocus />
             <input className='form-control form-control-lg' ref={lastNameRef} id="inputLastName" type="text" required placeholder='Last Name' />
             <input className='form-control form-control-lg' ref={emailRef} id="inputEmail" type="text" required placeholder='Email' />
             <button type='submit' className='btn btn-success btn-lg ms-3'  >Add</button>
        </div>
     </form>
     </div>
    );
}

export default StudentForm;
