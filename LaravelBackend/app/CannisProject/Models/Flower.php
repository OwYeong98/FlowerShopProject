<?php

namespace App\CannisProject\Models;

use Illuminate\Database\Eloquent\Model;

class Flower extends Model
{
    protected $table = 'flowers';

    protected $primaryKey = 'id';
    public $timestamps = false;

}
