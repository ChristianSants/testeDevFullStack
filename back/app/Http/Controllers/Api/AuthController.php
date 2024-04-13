<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\RegisterRequest;
use App\Services\Api\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
        //
    }

    public function login(Request $request)
    {
        $credentials = $request->only([
            'email', 'password'
        ]);

        if (Auth::attempt($credentials)) {
            $request->user()->tokens()->delete();
            $token = $request->user()->createToken('auth_token', expiresAt: Carbon::now()->addMinutes(env('EXPIRATION', 30)));

            return response()->json([
                'user' => $this->userService->find($request->user()->id),
                'token' => $token->plainTextToken,
                'expired_at' => $token->accessToken->expires_at,
            ], 200);
        }

        return response()->json(['error' => 'Não autorizado'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout feito com sucesso']);
    }

    public function register(RegisterRequest $request)
    {
        return response()->json(['token' => $this->userService->register($request)], 200);
    }
}
