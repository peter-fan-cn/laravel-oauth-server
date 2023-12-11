<?php

namespace App\Models\User;

use App\Libraries\Model\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'parent_id',
        'name',
        'description',
        'status',
        'level',
        'sort',
    ];

    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'user_has_organizations',
            'organization_id',
            'user_id',
        );
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
