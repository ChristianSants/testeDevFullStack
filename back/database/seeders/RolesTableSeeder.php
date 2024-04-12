<?php

namespace Database\Seeders;

use App\Constants\General\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(Roles::cases() as $role)
        {
            if(! Role::where('name', $role->value)->first())
                Role::create(['name' => $role->value]);
        }
    }
}
