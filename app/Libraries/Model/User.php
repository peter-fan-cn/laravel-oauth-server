<?php
/**
 * Created by cw-portal.
 * User: Peter Fan(peter.fan@codelocks.hk)
 * Date: 2022/12/3
 * Time: 8:35
 */

namespace App\Libraries\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
    use Notifiable, UuidPrimaryKey, WithValidates;

    protected $keyType = 'string';
    public $incrementing = false;
}
