<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\CannisProject\Models\UserModel;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;

class emailVerifyNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $user=null;
    public $verificationLink="";
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(UserModel $user)
    {
        $this->user = $user;

        //frontend link for verification
        $frontendEmailVerifyPageUrl = config('frontendEnvironmentConfig.FRONTEND_URL') . config('frontendEnvironmentConfig.FRONTEND_EMAIL_VERIFY_PAGE');

        //backend link for verification
        $signedBackendVerificationLink = URL::temporarySignedRoute(
            'verification.verify', Carbon::now()->addMinutes(60), ['id' => $user->id]
        );

        //frontend link with parameter=backendlink
        $this->verificationLink= $frontendEmailVerifyPageUrl.urlencode($signedBackendVerificationLink);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emailTemplate.verifyEmail');
    }
}
