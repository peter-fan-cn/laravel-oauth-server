<?php

namespace App\Models\User;

use App\Libraries\Model\Model;
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
}
