<?php

use Illuminate\Http\Request;

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* Api Register */
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return Response()->json(array("token"=>$token));
});
Route::resource('/accounts', AccountController::class);
Route::post('/login', [AccountController::class, 'onLogin']);
Route::post('/register', [AccountController::class, 'onRegister']);
Route::post('/forgot', [AccountController::class, 'onForgot']);