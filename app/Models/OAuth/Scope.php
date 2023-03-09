<?php

namespace App\Models\OAuth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scope extends Model
{
    use HasFactory;
    protected $table = 'oauth_scopes';
    public $timestamps = false;
}
