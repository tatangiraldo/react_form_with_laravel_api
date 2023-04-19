import React, {useState, useEffect} from 'react';
import { StudentModel } from '../../../models/student.model';

const StudentForm = ({add, existStudent, update}) => {
    
    useEffect(() => {    

        //update mode?
        if(existStudent?.id > 0){
            setName(existStudent.name)
            setLastName(existStudent.name)
            setAge(existStudent.age)
            setAddress(existStudent.address)
            //scheduleRef.current.value = existStudent.schedule
        }
    }, []);

    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')

    function handleStudent(e){
        e.preventDefault();
        const student = new StudentModel(
            0,
            name,
            last_name,
            age,
            address,
            0, //related_courses
        )

        //update mode?
        if(existStudent?.id > 0){
            student.id = existStudent.id
            student.related_students_number = existStudent.related_students_number
            update(student)
        }else{
            add(student)
        }
    }

    return (
        <form onSubmit={handleStudent} className="align-items-center mb-4">
            
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Student Register</label>
                <input 
                    value={name}
                    onChange={ (e) => setName(e.target.value) }
                    className='form-control form-control-lg' 
                    id="name" 
                    type="text" 
                    required placeholder='Name' autoFocus />
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Student Last Name</label>
                <input 
                    value={last_name}
                    onChange={ (e) => setLastName(e.target.value) }
                    className='form-control form-control-lg' 
                    id="last_name" 
                    type="text" 
                    required placeholder='Last Name' autoFocus />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input 
                    value={age}
                    onChange={ (e) => setAge(e.target.value) }
                    className='form-control form-control-lg'  
                    id="age" 
                    type="number" 
                    placeholder='Age'
                    required/>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">E-mail Address</label>
                <input 
                    value={address}
                    onChange={ (e) => setAddress(e.target.value) }
                    className='form-control form-control-lg'  
                    id="address" 
                    type="email" 
                    placeholder='Email'
                    required/>
            </div>
            <button type='submit' className='btn btn-primary ms-3 float-end'>
              { existStudent?.id > 0 ? 'Update'  : 'Create'  }  Student
            </button>
        </form>
    );
}

export default StudentForm;
