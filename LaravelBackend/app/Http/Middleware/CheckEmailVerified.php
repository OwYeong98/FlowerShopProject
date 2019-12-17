<?php

namespace App\Http\Middleware;

use Closure;

class CheckEmailVerified
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
        if($user->email_verified_at != null){
            return $next($request);
        }else{
            //respond with unauthorized
            $jsonContent = [
                'code' => 'Unauthorized',
                'http_code' => '401',
                'content' => [
                    'error' => 'Please Verify your email first!'
                ]
            ];

            //revoke all user token
            $userTokens = $user->tokens;
            foreach($userTokens as $token) {
                $token->revoke();
            }

            //generate new token
            $newToken= $user->createToken('personal')->accessToken;

            $header = [
                "Authorization" => $newToken
            ];

            $response = response($jsonContent,401,$header);

            return $response;
        }

    }
}
