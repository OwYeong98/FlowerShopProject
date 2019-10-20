<?php

namespace App\CannisProject\Transformers;

use App\CannisProject\Models\FlowerBouquet;
use App\CannisProject\Models\UsedFlowerInBouquet;
use League\Fractal;
use League\Fractal\Resource\Primitive;

class FlowerBouquetTransformer extends Fractal\TransformerAbstract
{
	public function transform(FlowerBouquet $bouquet)
	{
        //get flower list from UsedFlowerInBouquet Table
        $flowerList= array();
        $listbouquetlinks=UsedFlowerInBouquet::where('bouquetid',$bouquet->id)->get();
        foreach($listbouquetlinks as $link){
            array_push($flowerList,$link->flowerid);
        }

	    return [
	        'id'   => $bouquet->id,
            'name'    => $bouquet->name,
            'desc' => $bouquet->desc,
            'price' => $bouquet->price,
            'flowerList' => $flowerList,
            'imageUrl' => $bouquet->imageUrl,
        ];

    }
}
