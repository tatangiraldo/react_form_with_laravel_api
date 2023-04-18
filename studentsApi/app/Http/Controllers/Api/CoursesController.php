<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Enums\ScheduleType;

class CoursesController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = (object) array(
            'code'=>400,
            'data'=>null,
            'message'=>'Error getting Courses'
        );

        $courses = Course::all();
        if(!is_null($courses)){
            $response->code = 200;
            $response->message = '';
            $response->data = $courses;
        }
        return $response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = (object) array(
            'code'=>400,
            'data'=>null,
            'message'=>'Error creating Course'
        );

        //standarize name:
        $request->name = strtolower( $request->name);

        //validate unique Name course:
        $courseExist = Course::where('name', '=', $request->name)->first();
        if($courseExist){
            $response -> code = 500;
            $response->message = 'Course name duplicated';
            return $response;
        }

        $newCourse = new Course();
        $newCourse->name = $request->name;
        $newCourse->schedule = $request->schedule; // ScheduleType::Dia->value;
        $newCourse->start_date = $request->start_date;
        $newCourse->end_date = $request->end_date;
        $newCourse->related_students_number = 0;

        $newCourse->save();
        if($newCourse->id){
            $response -> code = 200;
            $response->message = 'Course created';
            $response->data = $newCourse;
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
        $response->data = Course::find($id);
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

        //standarize name:
        $request->name = strtolower( $request->name);

        $currentCourse = Course::find($id);
        if(is_null($currentCourse)){
            $response->code = 400;
            $response->message = 'Course Not Found';
        }else{

            //validate unique Name course:
            if($currentCourse->name != $request->name){
                $courseExist = Course::where('name', '=', $request->name)->first();
                if($courseExist){
                    $response -> code = 500;
                    $response->message = 'Course name duplicated';
                    return $response;
                }
            }

            $currentCourse->name = $request->name;
            $currentCourse->schedule = $request->schedule;
            $currentCourse->start_date = $request->start_date;
            $currentCourse->end_date = $request->end_date;
            $currentCourse->related_students_number = $request->related_students_number;
            $currentCourse->save();

            $response->message = 'Course Updated';
            $response->data = $currentCourse;
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

        $currentCourse = Course::find($id);
        if(is_null($currentCourse)){
            $response->code = 400;
            $response->message = 'Course Not Found';
        }else{
            $response->message = 'Course Removed';
            $removeCourse = Course::destroy($id);
        }

        return $response;
    }
}
