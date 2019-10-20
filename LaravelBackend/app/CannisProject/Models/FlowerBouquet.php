<?php

namespace App\CannisProject\Models;

use Illuminate\Database\Eloquent\Model;

class FlowerBouquet extends Model
{
    protected $table = 'flower_bouquets';

    protected $primaryKey = 'id';
    public $timestamps = true;
}
