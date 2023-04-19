
import './App.css';

import StudentListComponent from './components/container/StudentListComponent';
import CourseListComponent from './components/container/CourseListComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <nav className="nav">
      <a className="nav-link active" aria-current="page" href="/">Courses</a>
      <a className="nav-link" href="/students">Students</a>
    </nav>
    <br></br>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <CourseListComponent /> } />
        <Route path='/students' element={ <StudentListComponent /> } />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
