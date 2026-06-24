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

    public function store(Request $request)
{
    $recado = Recado::create([
        'titulo' => $request->titulo,
        'texto' => $request->texto,
    ]);

    return response()->json($recado, 201);
}

public function update(Request $request, $id)
{
    $recado = Recado::findOrFail($id);

    $recado->update([
        'titulo' => $request->titulo,
        'texto' => $request->texto,
    ]);

    return response()->json($recado);
}

public function destroy($id)
{
    $recado = Recado::findOrFail($id);
    $recado->delete();

    return response()->json(['message' => 'Recado deletado']);
}
}