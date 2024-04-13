<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\StoreRequest;
use App\Http\Requests\Api\User\UpdateRequest;
use App\Services\Api\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
        //
    }

    public function me(Request $request)
    {
        return $this->userService->find($request->user()->id);
    }

    public function index()
    {
        return response()->json([
            'users' => $this->userService->list()
        ], 200);
    }

    public function store(StoreRequest $request)
    {
        if($user = $this->userService->create($request)){
            return response()->json([
                'message' => 'Criado com Sucesso!',
                'user'    => $user
            ], 201);
        }

        return response()->json(['message' => 'Algum erro ocorreu!'], 500);
    }

    public function show(int $user)
    {
        return response()->json([
            'user' => $this->userService->find($user)
        ], 200);
    }

    public function update(UpdateRequest $request, int $user)
    {
        $result = $this->userService->update($user, $request);
        if ($result) {
            return response()->json(['message' => 'Usuário atualizado com sucesso.'], 200);
        }
        
        return response()->json(['error' => 'Algum erro ocorreu.'], 500);
    }
    
    public function destroy(int $user)
    {
        $result = $this->userService->delete($user);
        if ($result) {
            return response()->json(['message' => 'Usuário excluído com sucesso.'], 200);
        }

        return response()->json(['error' => 'Algum erro ocorreu.'], 500);
    }
}
