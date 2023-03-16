<?php
/**
 * Created by codelocks.
 * User: Peter Fan(peter.fan@codelocks.hk)
 * Date: 2020/8/13
 * Time: 9:11
 */

namespace App\Libraries\Model;


use Illuminate\Support\Str;

trait UuidPrimaryKey
{

    /**
     * @return void
     */
    protected static function booted()
    {
        static::creating(function ($model) {
            /**
             * @var $model \Illuminate\Database\Eloquent\Model
             */
            if(!$model->getKey() && !$model->incrementing && $model->getKeyType() === 'string') {
                $model->setAttribute($model->getKeyName(), (string)Str::uuid() );
            }
        });
    }

}
