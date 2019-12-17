<?php

namespace App\Http\Controllers;

use \App\CannisProject\Models\UserModel;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use App\CannisProject\Transformers\UserTransformer;

use League\Fractal\Resource\Item;
use League\Fractal\Manager;

use Illuminate\Support\Facades\Validator;

use function GuzzleHttp\json_encode;

class UserController extends ApiController
{
    public function __construct(){
        parent::__construct(new Manager());
    }

    public function login(Request $request){
        $this->request = $request;

        $emailInput = $request->input('email');
        $passwordInput = $request->input('password');

        if(Auth::attempt(['email' => $emailInput, 'password' => $passwordInput])){
            $loggedInUser = Auth::user();

            $userObject = UserModel::find($loggedInUser->id);

            //create a personal access token
            $token = $loggedInUser->createToken('personal')->accessToken;

            return $this->respondWithOk();
        }else{

            return $this->respondWithError("Email or Password is Wrong!",self::CODE_FORBIDDEN);
        }
    }

    public function register(Request $request){
        $this->request = $request;
        //password regex at least 1 uppercase,1 lowercase,1 number,1 special char, and minimun 8 character
        $validation = Validator::make($request->all(),[
            'name' => 'required|alpha',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
            'phoneNo' => 'required|numeric',
            'birthDate' => 'required|date_format:Y-m-d| before:today',
        ]);

        if($validation->fails()){
            $errors = $validation->errors();

            return $this->respondWithError($errors->all(),self::CODE_FORBIDDEN);
        } else{
            $newUser = new UserModel();

            $newUser->name = $request->input('name');
            $newUser->email = $request->input('email');
            $newUser->password = bcrypt($request->input('password'));
            $newUser->phone_no = $request->input('phoneNo');
            $newUser->birth_date = $request->input('birthDate');
            $newUser->isAdmin = false;

            $newUser->save();

            $newUser->sendEmailVerification();

            return $this->respondWithOk();
        }
    }

    public function editProfile(Request $request){
        $this->request = $request;
        //password regex at least 1 uppercase,1 lowercase,1 number,1 special char, and minimun 8 character
        $validation = Validator::make($request->all(),[
            'name' => 'alpha',
            'email' => 'email|unique:users,email',
            'password' => 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
            'phoneNo' => 'numeric',
            'birthDate' => 'date_format:Y-m-d| before:today',
        ]);

        if($validation->fails()){
            $errors = $validation->errors();

            return $this->respondWithError($errors->all(),self::CODE_FORBIDDEN);
        } else{
            $user= UserModel::find($request->user()->id);

            if($request->has('name')){
                $user->name = $request->input('name');
            }

            if($request->has('email')){
                $user->email = $request->input('email');
                $user->email_verified_at = null;
            }

            if($request->has('password')){
                $user->password = bcrypt($request->input('password'));
            }

            if($request->has('phoneNo')){
                $user->phone_no = $request->input('phoneNo');
            }

            if($request->has('birthDate')){
                $user->birth_date = $request->input('birthDate');
            }

            $user->save();

            if($request->has('email')){
                $user->sendEmailVerification();
            }


            return $this->respondWithOk();
        }
    }

    public function logout(Request $request){
        $this->request = $request;

        $token = $request->user()->token();

        logger($token->accessToken);
        $token->revoke();

        return $this->respondWithOk();
    }

    public function getProfile(Request $request){
        $this->request = $request;

        $user= UserModel::find($request->user()->id);

        return $this->respondSuccessWithObject($user,new UserTransformer());
    }

    public function getUserList(Request $request){
        $this->request = $request;

        $validation = Validator::make($request->all(),[
            'perpage' => 'required',
        ]);

        if($validation->fails()){
            $errors = $validation->errors();

            return $this->respondWithError($errors->all(),self::CODE_FORBIDDEN);
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
                        $columnNotExist = !Schema::hasColumn('users', $column);

                        if ($orderErrorExist || $columnNotExist){
                            array_push($errors,"there are error with the sorting rules '".$sortByRules."'");
                        }
                    }
                }
            }
            /************************* */

            if(count($errors)>0){
                return $this->respondWithError($errors,self::CODE_FORBIDDEN);
            }else{
                //empty query builder
                $querybuilder = UserModel::query();

                //add sort by if user pass in the rules
                if($request->input('sortbys','null') != 'null'){
                    $sortBy = $request->input('sortbys');
                    $sortByList = explode("|",$sortBy);

                    $splittedRules=explode(":",$sortByRules);
                    $column = $splittedRules[0];
                    $order = $splittedRules[1];
                    $querybuilder = UserModel::orderBy($column,$order);

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

                return $this->respondSuccessWithPagination($paginatedData->items(), new UserTransformer(),$paginatedParameter);
            }
        }
    }

}
