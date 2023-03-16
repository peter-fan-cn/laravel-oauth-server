<?php
/**
 * Created by cw-portal.
 * User: Peter Fan(peter.fan@codelocks.hk)
 * Date: 2022/12/3
 * Time: 8:20
 */

namespace App\Libraries\Model;

class Model extends \Illuminate\Database\Eloquent\Model
{
    use UuidPrimaryKey, WithValidates;
    protected $keyType = 'string';
    public $incrementing = false;
}
