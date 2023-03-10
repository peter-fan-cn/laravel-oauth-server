<?php

use App\Http\Controllers\Api\{ClientController, TokenController, UserController};
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('tokens', TokenController::class);
    Route::get('/user', function (){
        return request()->user();
    });
});
