<?php
use App\Http\Controllers\RecadoController;
use Illuminate\Support\Facades\Route;

Route::get('/recados', [RecadoController::class, 'index']);
Route::post('/recados', [RecadoController::class, 'store']);
Route::put('/recados/{id}', [RecadoController::class, 'update']);
Route::delete('/recados/{id}', [RecadoController::class, 'destroy']);