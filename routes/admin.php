<?php

use App\Http\Controllers\Admin\{
    ClientController,
    HomeController,
    ScopeController,
    TokenController,
    UserController
};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', [HomeController::class, 'index'])->name('admin');

// routes for Admin
Route::apiResource('users', UserController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('tokens', TokenController::class);
Route::apiResource('scopes', ScopeController::class);


