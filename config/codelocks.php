<?php

return [


    'cognito' =>[
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
        'user_pool_id' => env('AWS_COGNITO_USER_POOL_ID'),
        'app_client_id' => env('AWS_COGNITO_APP_CLIENT_ID'),
        'app_client_secret' =>env('AWS_COGNITO_APP_CLIENT_SECRET'),
    ]
];
