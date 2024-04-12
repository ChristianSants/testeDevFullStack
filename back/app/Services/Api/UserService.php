<?php

namespace App\Services\Api;

use App\Http\Requests\Api\User\StoreRequest;
use App\Models\User;
use App\Repositories\Api\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(
        protected UserRepository $repository
    ) {
        //
    }

    public function create(StoreRequest $request): string
    {
        $validatedData = $request->validated();

        $user = $this->repository->create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ]);

        return $user->createToken('auth_token')->plainTextToken;
    }

    public function byEmail(string $email): ?User
    {
        return $this->repository->byEmail($email);
    }
}