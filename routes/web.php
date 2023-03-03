<?php

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::prefix('/admin')
    ->middleware('auth')
    ->group(function () {
        Route::get('users', [\App\Http\Controllers\Admin\UserController::class, 'index']);
        Route::get('clients', [\App\Http\Controllers\Admin\ClientController::class, 'index']);
        Route::get('tokens', [\App\Http\Controllers\Admin\TokenController::class, 'index']);
    });
