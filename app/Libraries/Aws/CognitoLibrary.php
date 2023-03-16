<?php
/**
 * Created by CodeIgniter-Portal.
 * User: Peter Fan(peter.fan@codelocks.hk)
 * Date: 2023/2/9
 * Time: 15:28
 */

namespace App\Libraries\Aws;


use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\Credentials\Credentials;
use Aws\Result;
use Illuminate\Support\Facades\Log;

class CognitoLibrary
{
    public static function config()
    {
        return config('codelocks.cognito');
    }

    public static function client()
    {
        $options       = config('codelocks.cognito');
        $oCredentialsZ = new Credentials(data_get($options, 'key'), data_get($options, 'secret'));

        $options = [
            'region'      => data_get($options, 'region'),
            'version'     => 'latest',
            'credentials' => $oCredentialsZ,
            'http'        => [
                'verify' => config('app.env', 'development') !== 'production'
            ]
        ];

        return new CognitoIdentityProviderClient($options);
    }

    public static function findUserByEmail($email) {
        $result = CognitoLibrary::getUsers([
            'attributes' => ['email', 'sub'],
            'filter'     => "email = \"$email\""
        ]);
        return $result->get('Users');
    }

    /**
     * @param array $options
     * @return Result
     */
    public static function getUsers(array $options = []): Result
    {
        $config      = config('codelocks.cognito');
        $vUserPoolId = data_get($config, 'user_pool_id');
        /*
         * You can only search for the following standard attributes:
         * username (case-sensitive)
         * email
         * phone_number
         * name
         * given_name
         * family_name
         * preferred_username
         * cognito:user_status (called Status in the Console) (case-insensitive)
         * status (called Enabled in the Console) (case-sensitive)
         * sub
         */
        $aParameters = [
            'AttributesToGet' => data_get($options, 'attributes', ['email', 'username', 'sub']),
            'Filter'          => data_get($options, 'filter'),
            'Limit'           => (int)data_get($options, 'limit', 25),
            //'PaginationToken' => data_get($options, 'token'),
            'UserPoolId'      => $vUserPoolId, // REQUIRED
        ];
        if (data_get($options, 'token')) {
            $aParameters['PaginationToken'] = data_get($options, 'token');
        }
        Log::debug('aws list users parameters: ' . json_encode($aParameters));
        return self::client()->listUsers($aParameters);
    }

    public static function userAuth($username, $password): Result
    {
        $config       = config('codelocks.cognito');
        $vUserPoolId  = data_get($config, 'user_pool_id');
        $vAppClientId = data_get($config, 'app_client_id');
//        $vAppClientSecret = $config->appClientSecret;
//        $vSecurityHash    = CognitoLibrary::hash($password, $vAppClientSecret);
        $aParameters = [
            'AuthFlow'       => 'USER_PASSWORD_AUTH', // REQUIRED
            'AuthParameters' => [
                'USERNAME' => $username,
                'PASSWORD' => $password,
                //                'SECRET_HASH' => $vSecurityHash,
            ],
            'ClientId'       => $vAppClientId, // REQUIRED
            'UserPoolId'     => $vUserPoolId,  // REQUIRED
        ];
        Log::debug('aws initiate auth parameters: ' . json_encode($aParameters));
        return self::client()->initiateAuth($aParameters);
    }

    public static function getUser($accessToken): Result
    {
        return self::client()->getUser([
            "AccessToken" => $accessToken
        ]);
    }

    public static function response($session, $challengeName, $challengeResponses): Result
    {
        $vAppClientId = config('codelocks.cognito.app_client_id');
        $aParameters  = [
            'ChallengeName'      => $challengeName,
            'ChallengeResponses' => $challengeResponses,
            'ClientId'           => $vAppClientId,
            'Session'            => $session
        ];
        return CognitoLibrary::client()->respondToAuthChallenge($aParameters);
    }

    public static function adminResetUserPassword($username): Result
    {
        $vAppClientId = config('codelocks.cognito.app_client_id');
        $aParameters  = [
            'UserPoolId' => $vAppClientId, // REQUIRED
            'Username'   => $username, // REQUIRED
        ];
        return CognitoLibrary::client()->adminResetUserPassword($aParameters);
    }

    public static function adminSetUserPassword($username, $password): Result
    {
        $vUserPoolId = config('codelocks.cognito.user_pool_id');
        $aParameters = [
            'Password'   => $password, // REQUIRED
            'Permanent'  => true,
            'UserPoolId' => $vUserPoolId, // REQUIRED
            'Username'   => $username, // REQUIRED
        ];
        return CognitoLibrary::client()->adminSetUserPassword($aParameters);
    }

    public static function adminGetUser($username): Result
    {
        $vUserPoolId = config('codelocks.cognito.user_pool_id');
        $aParameters = [
            'UserPoolId' => $vUserPoolId, // REQUIRED
            'Username'   => $username, // REQUIRED
        ];
        return CognitoLibrary::client()->adminGetUser($aParameters);
    }
}
