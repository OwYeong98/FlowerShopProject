<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/* *********Route for email verification************** */
Route::get('email/verify/{id}', 'emailVerificationController@verify')->name('verification.verify');
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');


Route::group(['middleware' => 'auth:api'], function () {
    // User needs to be authenticated to enter here.
    Route::get('email/resend', 'emailVerificationController@resend')->name('verification.resend');
    //Route::post('detail', 'UserController@detail');
    Route::post('logout', 'UserController@logout');

});



