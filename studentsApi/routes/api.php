<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentsController;
use App\Http\Controllers\Api\CoursesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(StudentsController::class)->group(function (){
    Route::get('/students', 'index');
    Route::post('/student', 'store');
    Route::get('/student/{id}', 'show');
    Route::put('/student/{id}', 'update');
    Route::delete('/student/{id}', 'destroy');
    Route::post('/student/assignCourse', 'assignCourse');
    Route::post('/student/unassignCourse', 'unassignCourse');
});

Route::controller(CoursesController::class)->group(function (){
    Route::get('/courses', 'index');
    Route::post('/course', 'store');
    Route::get('/course/{id}', 'show');
    Route::put('/course/{id}', 'update');
    Route::delete('/course/{id}', 'destroy');
    Route::get('/courses/topCourses', 'topCourses');
});
