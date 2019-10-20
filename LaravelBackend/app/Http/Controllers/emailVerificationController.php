<?php

namespace App\Http\Controllers;

use App\CannisProject\Models\UserModel;
use Illuminate\Http\Request;

class emailVerificationController extends ApiController
{

    public function __construct()
    {
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    public function verify(Request $request) {
        $this->request = $request;
        if (!$request->hasValidSignature()) {
            //signature expired or value modified
            return $this->respondWithError("link Expired! Please Request again!",self::CODE_FORBIDDEN);
        }else{
            //if successfull verified
            $userObject = UserModel::find($request->route('id'));

            if($userObject->email_verified_at == null){
                $userObject->email_verified_at = now();
                $userObject->save();

                //successfully verify
                return $this->respondWithOk();
            }else{
                return $this->respondWithError("You Have already verify your email!",self::CODE_FORBIDDEN);
            }
        }
    }


    public function resend(Request $request)
    {
        $this->request = $request;
        if ($request->user()->hasVerifiedEmail()) {
            return $this->respondWithError('You Have already verify your email!', self::CODE_FORBIDDEN);
        }else{
            UserModel::find($request->user()->id)->sendEmailVerification();

            //successfully resend
            return $this->respondWithOk();
        }
    }

}
