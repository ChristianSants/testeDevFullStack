<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register'])->name('register');

Route::middleware('auth:sanctum')->group(function() {
    Route::get('me', function (Request $request) {
        return $request->user();
    });

    Route::get('logout', [AuthController::class, 'logout']);

    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index'])->middleware('role:Administrador,Moderador,Leitor');

        Route::post('/', [UserController::class, 'store']);

        Route::prefix('{user}')->group(function () {
            
            Route::get('/', [UserController::class, 'show']);

            Route::patch('/', [UserController::class, 'update'])->middleware('role:Administrador,Moderador');
    
            Route::delete('/', [UserController::class, 'destroy'])->middleware('role:Administrador');
        });
    });
});