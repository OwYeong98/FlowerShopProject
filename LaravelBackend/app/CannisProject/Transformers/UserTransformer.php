<?php

namespace App\CannisProject\Transformers;

use App\CannisProject\Models\UserModel;
use League\Fractal;
use League\Fractal\Resource\Primitive;

class UserTransformer extends Fractal\TransformerAbstract
{
	public function transform(UserModel $user)
	{

	    return [
	        'name'   => $user->name,
            'email'    => $user->email,
            'phone_no' => $user->phone_no,
            'birth_date' => $user->birth_date,
            'email_verified_at' => $user->email_verified_at,
        ];

    }
}
