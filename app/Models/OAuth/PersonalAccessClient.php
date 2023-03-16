<?php

namespace App\Models\OAuth;

use Illuminate\Support\Str;
use Laravel\Passport\Passport;

class PersonalAccessClient extends \Laravel\Passport\PersonalAccessClient
{
    /**
     * Get the auto-incrementing key type.
     *
     * @return string
     */
    public function getKeyType()
    {
        return Passport::clientUuids() ? 'string' : $this->keyType;
    }

    /**
     * Get the value indicating whether the IDs are incrementing.
     *
     * @return bool
     */
    public function getIncrementing()
    {
        return Passport::clientUuids() ? false : $this->incrementing;
    }


    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (config('passport.client_uuids')) {
                $model->{$model->getKeyName()} = $model->{$model->getKeyName()} ?: (string) Str::orderedUuid();
            }
        });
    }
}
