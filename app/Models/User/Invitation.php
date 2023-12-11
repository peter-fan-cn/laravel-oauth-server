<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Libraries\Model\Model;

class Invitation extends Model
{
    use HasFactory;
    protected $table = 'user_invitations';
    protected $fillable   = ['email', 'token'];
    public $timestamps = false;
}
