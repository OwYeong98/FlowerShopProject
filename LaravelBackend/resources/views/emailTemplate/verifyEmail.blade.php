@component('mail::message')
<h1>Verify your Email</h1>
Dear {{$user->name}},<br>
We Have Receive your Account creation at Cannis Flower & Hamper.<br>
Please Verify your email by clicking the button below.
@component('mail::button', ['url' => $verificationLink])
Verify Email
@endcomponent
If you have difficult pressing the button, copy the link below:
{{$verificationLink}}
<br>
If you do not make this register, <br>
Just ignore this message no further action required<br>
Thanks,<br>
{{ config('app.name') }}
@endcomponent
