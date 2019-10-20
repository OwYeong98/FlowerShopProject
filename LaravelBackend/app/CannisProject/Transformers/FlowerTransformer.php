<?php

namespace App\CannisProject\Transformers;

use App\CannisProject\Models\Flower;
use League\Fractal;
use League\Fractal\Resource\Primitive;

class FlowerTransformer extends Fractal\TransformerAbstract
{
	public function transform(Flower $flower)
	{

	    return [
	        'id'   => $flower->id,
            'flowerName'    => $flower->flowerName,
            'flowerDesc' => $flower->flowerDesc,
            'imageUrl' => $flower->imageUrl,
        ];

    }
}
