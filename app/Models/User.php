<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\User\Option;
use App\Models\User\Organization;
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
        'guard',
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
        'last_login_at'     => 'datetime'
    ];


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
        $this->belongsToMany(
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
