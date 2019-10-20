<?php

namespace App\CannisProject\Models;

use Illuminate\Database\Eloquent\Model;

class UsedFlowerInBouquet extends Model
{
    protected $table = 'used_flower_in_bouquets';

    protected $primaryKey = 'id';
    public $timestamps = false;
}
