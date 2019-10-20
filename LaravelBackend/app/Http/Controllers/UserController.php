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

    public function logout(Request $request){
        $this->request = $request;

        $token = $request->user()->token();

        logger($token->accessToken);
        $token->revoke();

        return $this->respondWithOk();
    }

    public function detail(Request $request){


    }

}
