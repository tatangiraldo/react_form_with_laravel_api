<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Course;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Student::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = (object) array(
            'code'=>400,
            'data'=>null,
            'message'=>'Error creating student'
        );

        $newStudent = new Student();
        $newStudent->name = $request->name;
        $newStudent->last_name = $request->last_name;
        $newStudent->age = $request->age;
        $newStudent->address = $request->address;
        $newStudent->related_courses = $request->related_courses;

        $newStudent->save();
        if($newStudent->id){
            $response->code = 200;
            $response->message = 'Student created';
            $response->data = $newStudent;
        }

        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $response = new stdClass();
        $response->code = 200;
        $response->data = Student::find($id);
        return $response;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $response = (object) array(
            'code'=>200,
            'data'=>null,
            'message'=>''
        );

        $currentStudent = Student::find($id);
        if(is_null($currentStudent)){
            $response->code = 400;
            $response->message = 'Student Not Found';
        }else{

            $currentStudent->name = $request->name;
            $currentStudent->last_name = $request->last_name;
            $currentStudent->age = $request->age;
            $currentStudent->address = $request->address;
            $currentStudent->related_courses = $request->related_courses;
            $currentStudent->save();

            $response->message = 'Student Updated';
            $response->data = $currentStudent;
        }

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $response = (object) array(
            'code'=>200,
            'data'=>null,
            'message'=>''
        );

        $currentStudent = Student::find($id);
        if(is_null($currentStudent)){
            $response->code = 400;
            $response->message = 'Student Not Found';
        }else{
            $response->message = 'Student Removed';
            $removeStudent = Student::destroy($id);
        }

        return $response;
    }

    public function assignCourse(Request $request ){//int $id, int $courseId){

        $response = (object) array(
            'code'=>500,
            'data'=>null,
            'message'=>''
        );

        if(! $this -> validateStructureData($request)){
            $response->message = 'Invalid data structure';
            return $response;
        }

        //validate previous assigned course:
        //$relationExist = Course::where('related_courses', 'LIKE', '%'.$courseId.'%')->get();

        //student exist?
        $student = Student::find($request->studentId);
        if(is_null($student)){
            $response->message = 'Student does not exist';
            return $response;
        }

        //course exist?
        $course = Course::find($request->courseId);
        if(is_null($course)){
            $response->message = 'Course does not exist';
            return $response;
        }

        $arrayCourses = explode(",", $student->related_courses);

        if( in_array($request->courseId, $arrayCourses) ){
            $response->message = 'Course already assigned';
            return $response;
        }else{
            array_push( $arrayCourses, $request->courseId);
        }

        $student->related_courses = implode(",", $arrayCourses);
        $student->save();

        $response -> code = 200;
        $response->message = 'Course assigned';
        $response->data = $student;


        return $response;

    }

    public function unassignCourse(Request $request ){//int $id, int $courseId){

        $response = (object) array(
            'code'=>500,
            'data'=>null,
            'message'=>''
        );

        if(! $this -> validateStructureData($request)){
            $response->message = 'Invalid data structure';
            return $response;
        }

        //validate previous assigned course:
        //$relationExist = Course::where('related_courses', 'LIKE', '%'.$courseId.'%')->get();

        //student exist?
        $student = Student::find($request->studentId);
        if(is_null($student)){
            $response->message = 'Student does not exist';
            return $response;
        }

        $arrayCourses = explode(",", $student->related_courses);

        if (($key = array_search($request->courseId, $arrayCourses)) !== false) {
            unset($arrayCourses[$key]);
        }

        $student->related_courses = implode(",", $arrayCourses);
        $student->save();

        $response -> code = 200;
        $response->message = 'Course unnasigned';
        $response->data = $student;


        return $response;

    }

    public function validateStructureData(Request $request){

        if(!isset($request->studentId) || !isset($request->courseId)){
            return false;
        }
        return true;
    }
}
