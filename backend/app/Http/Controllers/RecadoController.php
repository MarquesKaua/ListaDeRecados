<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recado;

class RecadoController extends Controller
{
    public function index()
    {
        $recados = Recado::where('user_id', auth()->id())->get();

        return response()->json($recados);
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'titulo' => 'required|max:255',
            'texto' => 'required',
        ]);

        $recado = Recado::create([
            'titulo' => $dados['titulo'],
            'texto' => $dados['texto'],
            'user_id' => auth()->id(),
        ]);

        return response()->json($recado, 201);
    }

    public function update(Request $request, $id)
    {
        $dados = $request->validate([
            'titulo' => 'required|max:255',
            'texto' => 'required',
        ]);

        $recado = Recado::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $recado->update($dados);

        return response()->json($recado);
    }

    public function destroy($id)
    {
        $recado = Recado::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $recado->delete();

        return response()->json(['message' => 'Recado deletado']);
    }
}