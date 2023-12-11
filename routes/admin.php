<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\{ClientController,
    HomeController as AdminHomeController,
    ScopeController,
    TokenController,
    UserController
};
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Http\Controllers\ApproveAuthorizationController;
use Laravel\Passport\Http\Controllers\AuthorizationController;
use Laravel\Passport\Http\Controllers\DenyAuthorizationController;
use Laravel\Passport\Http\Controllers\TransientTokenController;

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


Route::get('/', [AdminHomeController::class, 'index'])->name('admin');
Route::resource('users', UserController::class)->only(['index', 'show', 'edit', 'create']);
Route::resource('clients', ClientController::class)->only(['index', 'show', 'edit', 'create']);
Route::resource('tokens', TokenController::class)->only(['index', 'show']);
Route::resource('scopes', ScopeController::class)->only(['index', 'show', 'edit', 'create']);


