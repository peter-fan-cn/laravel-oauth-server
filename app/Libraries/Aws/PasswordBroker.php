<?php

namespace App\Libraries\Aws;

use App\Models\User;
use Illuminate\Auth\Passwords\PasswordBroker as Broker;

class PasswordBroker extends Broker
{
    public function __construct(\Illuminate\Contracts\Auth\PasswordBroker $broker)
    {
        parent::__construct($broker->tokens, $broker->users);
    }

    public function getUser(array $credentials)
    {
        $user = parent::getUser($credentials);
        if (!$user) {
            // try to find users from Cognito
            $email = data_get($credentials,'email');
            $cognitoUsers = CognitoLibrary::findUserByEmail($email);
            if(count($cognitoUsers) > 0) {
                $cognitoUser = $cognitoUsers[0];
                $cognitoUser = CognitoLibrary::adminGetUser(data_get($cognitoUser,'Username'));
                if($cognitoUser->get('Enabled')) {
                    $attributes = collect($cognitoUser->get('UserAttributes'))->pluck('Value', 'Name');
                    $id         = $cognitoUser->get('Username');
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
        }
    }


}
