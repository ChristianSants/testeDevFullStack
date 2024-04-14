<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrador',
                'email' => 'admin@teste.com',
                'password' => '123456',
                'role' => 'Administrador',
            ],
            [
                'name' => 'Moderador',
                'email' => 'moderador@teste.com',
                'password' => '123456',
                'role' => 'Moderador',
            ],
            [
                'name' => 'Leitor',
                'email' => 'leitor@teste.com',
                'password' => '123456',
                'role' => 'Leitor',
            ],
            [
                'name' => 'Leitor 2',
                'email' => 'leitor2@teste.com',
                'password' => '123456',
                'role' => 'Leitor',
            ],
            [
                'name' => 'Leitor 3',
                'email' => 'leitor3@teste.com',
                'password' => '123456',
                'role' => 'Leitor',
            ],
            [
                'name' => 'Leitor 4',
                'email' => 'leitor4@teste.com',
                'password' => '123456',
                'role' => 'Leitor',
            ]
        ];

        foreach($users as $userData)
        {
            // Criar usuário
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => $userData['password'],
            ]);

            // Obter ou criar a role
            $role = Role::where('name', $userData['role'])->first();
            if (!$role) {
                $role = Role::create(['name' => $userData['role']]);
            }

            // Atribuir a role ao usuário
            $user->assignRole($role);
        }
    }
}
