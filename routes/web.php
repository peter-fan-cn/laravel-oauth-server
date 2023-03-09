<?php

use App\Http\Controllers\Admin\{ClientController,
    HomeController as AdminHomeController,
    TokenController,
    UserController};
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::middleware('auth')->group(function(){
    Route::get('/home', [HomeController::class, 'index'])->name('home');
});

Route::prefix('/admin')
    ->middleware('auth')
    ->group(function () {
        Route::get('/', [AdminHomeController::class, 'index']);
//        Route::resource('users', UserController::class)->only(['index', 'show', 'edit','create']);
//        Route::resource('clients', ClientController::class)->only(['index', 'show', 'edit','create']);
//        Route::resource('tokens', TokenController::class)->only(['index', 'show']);

        Route::inertia('users', 'Admin/Users/List');
        Route::inertia('clients', 'Admin/Clients/List');
        Route::inertia('tokens', 'Admin/Tokens/List');
    });
