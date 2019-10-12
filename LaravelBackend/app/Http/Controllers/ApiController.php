<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use League\Fractal\Resource\Collection;

use function GuzzleHttp\json_encode;

class ApiController extends Controller
{
    const CODE_SUCCESS = 200;

    const CODE_BAD_REQUEST = 400;

    const CODE_UNAUTHORIZED = 401;

    const CODE_FORBIDDEN = 403;

    const CODE_SERVICE_UNAVAILABLE = 503;

    public $currentStatusCode = 200;
    //Fractal Manager
    public $fractal = null;


    function __construct($fractal){
       $this->fractal = $fractal;
    }

    function respondWithOk(){
        return $this->respond('OK','');
    }

    function respondSuccessWithObject($object, $transformer){
        $resource = new Item($object, $transformer); // Create a resource collection transformer
        $jsonObject = $this->fractal->createData($resource); // transform data to json
        $jsonArray = $jsonObject->toArray();

        return $this->respond("OK",$jsonArray);
    }

    function respondSuccessWithCollection($collection, $transformer){
        $resource = new Collection($collection,$transformer);
        $jsonObject = $this->fractal->createData($resource);
        $jsonArray = $jsonObject->toArray();

        return $this->respond("OK",$jsonArray);
    }

    function respondSuccessWithArray($array){

        return $this->respond("OK", $array);
    }

    public function respondWithError($message,$errorCode){
        $this->currentStatusCode = $errorCode;
        return $this->respond($message,'',true);
    }

    function respond($message, $data, $error=false){

        $jsonContent = [
            'code' => 'asd',
            'http_code' => 'asd',
            'content' => [
                'data' => $data
            ]
        ];

        if($error == true){
            $jsonContent['content']['error'] = $message;
        }else{
            $jsonContent['content']['message'] = $message;
        }


        $header = [
            "Authorization" => 'token'
        ];

        $response = response($jsonContent,$this->currentStatusCode,$header);


        return $response;
    }


}
