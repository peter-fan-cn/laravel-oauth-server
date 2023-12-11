<?php

namespace App\Models\User;

use App\Libraries\Model\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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
        $this->belongsToMany(
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
