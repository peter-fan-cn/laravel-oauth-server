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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['register' => false]);

Route::post('login/new-password', [LoginController::class, 'responseToCognitoAuth'])->name('login.new_password');


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


Route::group([
    'as'     => 'passport.',
    'prefix' => config('passport.path', 'oauth'),
], function () {


    Route::post('/token', [AccessTokenController::class, 'token'])
        ->middleware('throttle')
        ->name('token');
    Route::get('/authorize', [AuthorizationController::class, 'authorize'])
        ->middleware('web')
        ->name('authorizations.authorize');

    Route::middleware([
        'web',
        'auth:' . config('passport.guard', 'web')
    ])->group(function () {
        Route::post('/token/refresh', [TransientTokenController::class, 'refresh'])->name('token.refresh');
        Route::post('/authorize', [ApproveAuthorizationController::class, 'approve'])->name('authorizations.approve');
        Route::delete('/authorize', [DenyAuthorizationController::class, 'deny'])->name('authorizations.deny');
    });
});
