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
                'code' => 'Unauthorized',
                'http_code' => '401',
                'content' => [
                    'error' => 'You are not an Admin!'
                ]
            ];

            $header = [
                "Authorization" => null
            ];

            $response = response($jsonContent,401,$header);

            return $response;
        }

    }
}
