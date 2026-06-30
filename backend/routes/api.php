<?php
use App\Http\Controllers\RecadoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/recados', [RecadoController::class, 'index']);
    Route::post('/recados', [RecadoController::class, 'store']);
    Route::put('/recados/{id}', [RecadoController::class, 'update']);
    Route::delete('/recados/{id}', [RecadoController::class, 'destroy']);

});