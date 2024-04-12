<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class CRUDRepository {
    public abstract function entity(): Model;
    
    public function create(array $data): Model | NULL
    {
        return $this->entity()->create($data);
    }

    public function list(): Collection
    {
        return $this->entity()->get();
    }

    public function find(int $id): Model | NULL
    {
        return $this->entity()->find($id);
    }

    public function update(int $id, array $data): bool
    {
        return $this->find($id)->update($data);
    }

    public function delete(int $id): bool
    {
        return $this->find($id)->delete();
    }
}