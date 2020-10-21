<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use League\Fractal\Manager;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use \App\CannisProject\Models\Flower;
use Illuminate\Support\Facades\Log;
use App\CannisProject\Transformers\FlowerTransformer;

use function GuzzleHttp\json_encode;

class FlowerController extends ApiController
{
    public function __construct(){
        parent::__construct(new Manager());
    }

    public function getFlowerList(Request $request){
        $this->request = $request;

        $validation = Validator::make($request->all(),[
            'perpage' => 'required',
        ]);

        if($validation->fails()){
            $errors = $validation->errors();

            return $this->respondWithError($errors->all(),self::CODE_BAD_REQUEST);
        } else{

            $errors = array();

            /*********************Validatation for sortBy***************/
            if($request->input('sortbys','null') != 'null'){
                $sortBy = $request->input('sortbys');
                $sortByList = explode("|",$sortBy);

                foreach($sortByList as $sortByRules){
                    $splittedRules=explode(":",$sortByRules);
                    if(count($splittedRules) != 2){
                        array_push($errors,"Please follow the format 'ColumnToSort|order'. Example:'Name:Asc'");
                    }else{
                        $column = $splittedRules[0];
                        $order = $splittedRules[1];

                        $orderErrorExist =strtolower(trim($order)) != "asc" && strtolower(trim($order)) != "desc";
                        $columnNotExist = !Schema::hasColumn('flowers', $column);

                        if ($orderErrorExist || $columnNotExist){
                            array_push($errors,"there are error with the sorting rules '".$sortByRules."'");
                        }
                    }
                }
            }
            /************************* */

            if(count($errors)>0){
                return $this->respondWithError($errors,self::CODE_BAD_REQUEST);
            }else{
                //empty query builder
                $querybuilder = Flower::query();

                //add sort by if user pass in the rules
                if($request->input('sortbys','null') != 'null'){
                    $sortBy = $request->input('sortbys');
                    $sortByList = explode("|",$sortBy);

                    $splittedRules=explode(":",$sortByRules);
                    $column = $splittedRules[0];
                    $order = $splittedRules[1];
                    $querybuilder = Flower::orderBy($column,$order);

                    foreach($sortByList as $sortByRules){
                        $splittedRules=explode(":",$sortByRules);
                        $column = $splittedRules[0];
                        $order = $splittedRules[1];

                        $querybuilder->orderBy($column,$order);
                    }
                }

                $perpage = $request->input('perpage');

                $paginatedData = $querybuilder->Paginate($perpage);
                $paginatedParameter= [
                    'last_page_url'=>$paginatedData->url($paginatedData->lastPage()),
                    'next_page_url'=>$paginatedData->nextPageUrl(),
                    'prev_page_url'=>$paginatedData->previousPageUrl(),
                ];

                if($paginatedParameter['last_page_url'] != null){
                    $paginatedParameter['last_page_url'] .= '&perpage='.$perpage;
                }
                if($paginatedParameter['next_page_url'] != null){
                    $paginatedParameter['next_page_url'] .= '&perpage='.$perpage;
                }
                if($paginatedParameter['prev_page_url'] != null){
                    $paginatedParameter['prev_page_url'] .= '&perpage='.$perpage;
                }


                return $this->respondSuccessWithPagination($paginatedData->items(), new FlowerTransformer(),$paginatedParameter);
            }
        }
    }


    public function addFlower(Request $request){
        $this->request = $request;

        $validation = Validator::make($request->all(),[
            'name' => 'required|min:4|max:50',
            'desc' => 'required|min:30|max:600',
            'image' => 'required|image',
        ]);

        Log::Debug($request->image);

        if($validation->fails()){
            $errors = $validation->errors();

            return $this->respondWithError($errors->all(),self::CODE_BAD_REQUEST);
        } else{
            //save image
            $imageFile = $request->file('image');
            $path = '/images/uploads/flowers/';

            //random generate fileName
            $imageName= (string) Str::uuid();
            $imageExtension = \File::extension($imageFile->getClientOriginalName());
            $imageFullName= $imageName.'.'.$imageExtension;
            $imageFullPath= $path.$imageFullName;

            while(\Storage::disk('publicPath')->exists($imageFullPath)){
                //random generate name again if file name exist
                $imageName= (string) Str::uuid();
                $imageExtension = \File::extension($imageFile->getClientOriginalName());
                $imageFullName= $imageName.'.'.$imageExtension;
                $imageFullPath= $path.$imageFullName;
            }
            //store image to public folder
            $imageFile->storeAs($path, $imageFullName, ['disk' => 'publicPath']);


            //save to database
            $newFlower = new Flower();

            $newFlower->flowerName = $request->input('name');
            $newFlower->flowerDesc = $request->input('desc');
            $newFlower->imageUrl = $imageFullPath;

            $newFlower->save();


            return $this->respondWithOk();
        }
    }

}
