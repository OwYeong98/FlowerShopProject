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

Route::get('user/email/verify/{id}', 'emailVerificationController@verify')->name('verification.verify');
Route::post('user/login', 'UserController@login');
Route::post('user/register', 'UserController@register');

/* *********Route for get information************** */
Route::get('flower', 'FlowerController@getFlowerList');

Route::put('flowerbouquet', 'FlowerBouquetController@addFlowerBouquet');
Route::get('flowerbouquet', 'FlowerBouquetController@getFlowerBouquetList');

/* *********Route that need logged in user************** */
Route::group(['middleware' => 'auth:api'], function () {
    // User needs to be authenticated to enter here.
    Route::get('user/email/resend', 'emailVerificationController@resend')->name('verification.resend');
    Route::post('/user/logout', 'UserController@logout');

    /* *********Route that need admin privilege************** */
    Route::group(['middleware' => 'CheckAdminPrivilege'], function () {
        // User needs to be admin
        Route::put('flower', 'FlowerController@addFlower');

    });


});




