<?php

namespace App\Http\Middleware;

use Closure;
use \App\CannisProject\Models\UserModel;

class CheckAdminPrivilege
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user= UserModel::find($request->user()->id);

        //if user is admin let them proceed to the request
        if($user->isAdmin == true){
            return $next($request);
        }else{
            //respond with unauthorized
            $jsonContent = [
                'code' => 'Forbidden',
                'http_code' => '403',
                'content' => [
                    'error' => 'You are not an Admin!'
                ]
            ];

            //revoke all user token
            
            $userTokens = $request->user()->tokens;
            foreach($userTokens as $token) {
                $token->revoke();
            }

            //generate new token
            $newToken= $request->user()->createToken('personal')->accessToken;

            $header = [
                "Authorization" => $newToken
            ];

            $response = response($jsonContent,403,$header);

            return $response;
        }

    }
}
