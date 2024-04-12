<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\StoreRequest;
use App\Services\Api\UserService;
use Illuminate\Http\Request;
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
            $token = $request->user()->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $this->userService->byEmail($request->input('email')),
                'token' => $token
            ], 200);
        }

        return response()->json(['error' => 'Não autorizado'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout feito com sucesso']);
    }

    public function register(StoreRequest $request)
    {
        return response()->json(['token' => $this->userService->create($request)], 200);
    }
}
