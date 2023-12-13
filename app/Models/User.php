<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\User\Option;
use App\Models\User\Organization;
use Carbon\Carbon;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class User extends \App\Libraries\Model\User implements \Illuminate\Contracts\Auth\CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'avatar',
        'name',
        'email',
        'phone_number',
        'password',
        'description',
        'organization_id',
        'last_login_at',
        'is_admin',
        'level',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at'     => 'datetime',
        'is_admin'          => 'boolean'
    ];

    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    /**
     * @param string $key
     * @return mixed
     */
    public function getOptions(string $key): mixed
    {
        $options = $this->options()->where('key', 'like', "$key.*")->get();
        return $options->pluck('value')->all();
    }

    /**
     * @param string $key
     * @param string $cast boolean, integer, array, datetime
     * @param mixed|null $castOption
     * @return mixed
     */
    public function getOption(string $key, string $cast = 'string', mixed $castOption = null): mixed
    {
        $option = $this->options()->where('key', $key)->first();

        return match ($cast) {
            'boolean'  => boolval($option->value),
            'integer'  => intval($option->value),
            'array'    => json_encode($option->value, true),
            'datetime' => Carbon::createFromTimeString($option->value, $castOption),
            default    => $option->value,
        };
    }

    /**
     * @param string $key
     * @param mixed|null $value
     * @param string $cast
     * @return void
     */
    public function setOption(string $key, mixed $value = null,  string $cast = 'string'): void
    {
        $this->options()->upsert([
            'key'   => $key,
            'value' => $value,
            'cast' => $cast
        ], ['user_id', 'key'], ['value']);
    }

    public function avatarUrl($size = null): string
    {
        $avatar = $this->avatar;
        if (!$avatar) {
            $email  = $this->email;
            $avatar = "https://s.gravatar.com/avatar/" . md5(strtolower(trim($email))) . ($size ? "?s=" . $size : '');
        }
        return $avatar;
    }


    public function options()
    {
        return $this->hasMany(Option::class, 'user_id');
    }

    public function ownedOrganizations()
    {
        return $this->hasMany(Organization::class, 'owner_id');
    }

    public function organizations()
    {
        return $this->belongsToMany(
            Organization::class,
            'user_has_organizations',
            'user_id',
            'organization_id'
        );
    }

    public function currentOrganization()
    {
        return $this->getAttribute('organization_id') ?
            $this->belongsTo(Organization::class, 'organization_id') :
            $this->hasOne(Organization::class, 'owner_id')->latestOfMany();
    }


}
