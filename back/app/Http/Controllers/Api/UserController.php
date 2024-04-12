<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\StoreRequest;
use App\Services\Api\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
        //
    }

    public function create(StoreRequest $request)
    {
        return response()->json(['token' => $this->userService->create($request)], 200);
    }

    public function delete()
    {
        
    }
}
