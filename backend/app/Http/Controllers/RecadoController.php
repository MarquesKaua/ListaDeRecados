<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recado;

class RecadoController extends Controller
{
    public function index()
    {
        $recados = Recado::all();

        return response()->json($recados);
    }
}