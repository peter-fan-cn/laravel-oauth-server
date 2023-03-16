<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Libraries\Aws\CognitoLibrary;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Aws\CognitoIdentityProvider\Exception\CognitoIdentityProviderException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * The user has been authenticated.
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        $user->last_login_at = now();
        $user->save();
    }

    /**
     * Handle a login request to the application.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($user = $this->validateUser($request)) {
            return $this->validated($request, $user);;
        } else if ($result = $this->validateCognitoUser($request)) {
            if ($result instanceof View) {
                return $result;
            } elseif ($user = $result) {
                return $this->validated($request, $user);
            }
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    private function validateUser(Request $request)
    {
        $username = $request->input($this->username());
        $password = $request->input('password');
        // look up users on database
        /**
         * @var $user User
         */
        $user = User::where('email', $username)->first();
        if ($user === null) {
            return false;
        }
        $user->setVisible(['password']);
        Hash::check($password, $user->getAuthPassword());
        return $user;
    }


    /**
     * @throws ValidationException
     */
    public function validateCognitoUser(Request $request)
    {
        $username = $request->input($this->username());
        $password = $request->input('password');
        try {
            // look up users via Cognito
            $cognitoUsers = CognitoLibrary::findUserByEmail($username);
            Log::debug('list users: ', $cognitoUsers);
            if(count($cognitoUsers) === 0) {
                throw ValidationException::withMessages([
                    $this->username() => [trans('auth.failed')],
                ]);
            }
            $cognitoUser = $cognitoUsers[0];
            $awsResult   = CognitoLibrary::userAuth(data_get($cognitoUser, 'Username'), $password);

            if (!$awsResult->get('Session')) {
                Log::debug('cognito auth successful and get user via access token');
                $accessToken    = $awsResult->get('AuthenticationResult')['AccessToken'];
                $user           = $this->getNewUser($accessToken);
                $user->password = Hash::make($password);
                $user->save();
                return $user;
            } else if ($awsResult->get('ChallengeName') === 'NEW_PASSWORD_REQUIRED') {
                Log::debug('cognito auth failed and required new password');
                return view('auth.new_password', [
                    'username' => data_get($cognitoUser, 'Username'),
                    'session'  => $awsResult->get('session'),
                    'remember' => $request->input('remember')
                ]);
            }
            Log::warning('cognito auth failed with unsupported challenge name: ' . $awsResult->get('ChallengeName'));
            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed')],
            ]);
        } catch (CognitoIdentityProviderException $ex) {
            if ($ex->getAwsErrorCode() === 'NotAuthorizedException') {
                throw ValidationException::withMessages([
                    'password' => [trans('auth.password')],
                ]);
            }
            Log::warning('aws sdk throw an exception: ' . $ex->getAwsErrorMessage());
            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed')],
            ]);
        }

    }


    public function responseToCognitoAuth(Request $request)
    {
        $password      = $request->input('password');
        $session       = $request->input('session');
        $username      = $request->input('username');
        $challengeName = 'NEW_PASSWORD_REQUIRED';
        try {
            $awsResult      = CognitoLibrary::response($session, $challengeName, [
                'NEW_PASSWORD' => $password,
                'USERNAME'     => $username
            ]);
            $accessToken    = $awsResult->get('AuthenticationResult')['AccessToken'];
            $user           = $this->getNewUser($accessToken);
            $user->password = Hash::make($password);
            $user->save();
            if ($awsResult->get('session')) {
                Log::warning('cognito respond to auth challenge failed with unsupported challenge name: ' . $awsResult->get('ChallengeName'));
                throw ValidationException::withMessages([
                    $this->username() => [trans('auth.failed')],
                ]);
            }
            return $this->validated($request, $user);
        } catch (CognitoIdentityProviderException $ex) {
            if ($ex->getAwsErrorCode() === 'NotAuthorizedException') {
                throw ValidationException::withMessages([
                    'password' => [trans('auth.password')],
                ]);
            }
            Log::warning('aws sdk throw an exception: ' . $ex->getAwsErrorMessage());
            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed')],
            ]);
        }
    }

    public function validated(Request $request, $user)
    {
        $this->guard()->login($user, $request->boolean('remember'));
        if ($request->hasSession()) {
            $request->session()->put('auth.password_confirmed_at', time());
        }
        return $this->sendLoginResponse($request);
    }

    /**
     * @param $accessToken
     */
    private function getNewUser($accessToken): User
    {
        Log::debug('get user information with access token: ' . $accessToken);
        $oResultZ = CognitoLibrary::getUser($accessToken);
        Log::debug('cognito user information', $oResultZ->toArray());
        $attributes = collect($oResultZ->get('UserAttributes'))->pluck('Value', 'Name');
        $id         = $oResultZ->get('Username');
        $email      = data_get($attributes, 'email');
        $name       = data_get($attributes, 'custom:displayname');
        $level      = data_get($attributes, 'custom:displayname');
        if (!$name) {
            $name = data_get($attributes, 'name', 'Undefined');
        }
        $user = new User(['name' => $name, 'email' => $email]);

        $user->sub               = $id;
        $user->provider          = 'Cognito';
        $user->user_level        = $level;
        $user->email_verified_at = data_get($attributes, 'email_verified') ? now() : null;
        return $user;
    }

}
