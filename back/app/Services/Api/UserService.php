<?php

namespace App\Services\Api;

use App\Http\Requests\Api\User\RegisterRequest;
use App\Http\Requests\Api\User\StoreRequest;
use App\Http\Requests\Api\User\UpdateRequest;
use App\Models\User;
use App\Repositories\Api\UserRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function __construct(
        protected UserRepository $repository
    ) {
        //
    }

    public function list(): Collection
    {
        return $this->repository->list();
    }

    public function find(int $user): User | NULL
    {
        return $this->repository->find($user);
    }

    public function create(StoreRequest $request): User | NULL
    {
        $validated = $request->validated();
        
        if($user = $this->repository->create($validated)){
            $user->assignRole($validated['role']);
        }

        return $user;
    }

    public function update(int $user, UpdateRequest $request): bool
    {
        if($user = $this->find($user)){
            $validated = $request->validated();

            if($this->repository->update($user->getKey(), $validated)){
                // se usuário n tiver essa permissao q está sendo passada iremos apagar e inserir a nova permissão
                if(! $user->hasRole($validated['role'])){
                    $user->roles()->detach();
                    $user->assignRole($validated['role']);
                }

                return true;
            }
        }
        
        return false;
    }

    public function delete(int $user): bool
    {
        if($this->find($user)){
            return $this->repository->delete($user);
        }

        return false;
    }

    public function register(RegisterRequest $request): string
    {
        $validatedData = $request->validated();

        try{
            DB::beginTransaction();

            $user = $this->repository->create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'],
            ]);
    
            $user->assignRole('Leitor');
    
            DB::commit();

            return $user->createToken('auth_token')->plainTextToken;

        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
    }
}