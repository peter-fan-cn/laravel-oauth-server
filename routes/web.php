<?php

use App\Http\Controllers\Admin\{ClientController,
    HomeController as AdminHomeController,
    ScopeController,
    TokenController,
    UserController};
use App\Http\Controllers\HomeController;
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
Route::middleware('auth')->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home');
});

Route::prefix('/admin')
    ->middleware('auth')
    ->group(function () {
        Route::get('/', [AdminHomeController::class, 'index'])->name('admin');
        Route::resource('users', UserController::class)->only(['index', 'show', 'edit', 'create']);
        Route::resource('clients', ClientController::class)->only(['index', 'show', 'edit', 'create']);
        Route::resource('tokens', TokenController::class)->only(['index', 'show']);
        Route::resource('scopes', ScopeController::class)->only(['index', 'show', 'edit', 'create']);
    });
