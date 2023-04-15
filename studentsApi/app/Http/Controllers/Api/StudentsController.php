<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

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
            $response -> code = 200;
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
}
