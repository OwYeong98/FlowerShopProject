<?php

namespace App\CannisProject\Models;

use Illuminate\Database\Eloquent\Model;
use App\CannisProject\Notifications\emailNotification;
use Illuminate\Support\Facades\Mail;

use App\Mail\emailVerifyNotification;

class UserModel extends Model
{

    protected $table = 'users';

    protected $primaryKey = 'id';

    public function sendEmailVerification()
    {
        Mail::to($this)->send(new emailVerifyNotification($this));
    }
}
