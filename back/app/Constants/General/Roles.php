<?php

namespace App\Constants\General;

enum Roles: string
{
    case ADMINISTRADOR = 'Administrador';
    case MODERADOR = 'Moderador';
    case LEITOR = 'Leitor';
}