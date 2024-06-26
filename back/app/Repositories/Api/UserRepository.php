<?php

namespace App\Repositories\Api;

use App\Models\User;
use App\Repositories\CRUDRepository;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends CRUDRepository
{
    public function entity(): Model
    {
        return new User();
    }
}