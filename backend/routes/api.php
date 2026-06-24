<?php
use App\Http\Controllers\RecadoController;
use Illuminate\Support\Facades\Route;

Route::get('/recados', [RecadoController::class, 'index']);