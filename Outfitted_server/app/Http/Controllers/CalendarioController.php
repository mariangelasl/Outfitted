<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calendario;
use Carbon\Carbon;

class CalendarioController extends Controller
{
    //
    function getCalendarios() {
        return Calendario::all();
     }

    function updateCalendario(Request $request, $id) {
        
        $calendario = Calendario::find($id);
        $calendario->update($request->all());
  
        return $calendario;
    }

    function getCalendario($id){
        $calendario = Calendario::find($id); 
        return $calendario;
    }

    function createCalendario(Request $request){
        
        $calendario = Calendario::create($request->all());
        return $calendario;
        
    }

    function deleteCalendario($id){
        $calendario = Calendario::find($id);
        $calendario->delete();

        return $calendario;
    }


    public function crearEvento(Request $request){
    $validated = $request->validate([
        'outfit_id' => 'required|exists:outfits,id',
        'fecha_inicio' => 'required|date|after_or_equal:today',
        'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
    ]);

    $evento = Calendario::create($validated);

    return $evento;
    }


    public function eventoMes($id, $anyo, $mes)
{
    $inicio = Carbon::create($anyo, $mes, 1)->startOfMonth();
    $fin = Carbon::create($anio, $mes, 1)->endOfMonth();

    $eventos = Calendario::with('outfit')
        ->whereBetween('fecha_inicio', [$inicio, $fin])
        ->orWhereBetween('fecha_fin', [$inicio, $fin])
        ->get();

    return response()->json($eventos);
}   

//es este
public function eventosMes($id, $anio, $mes)
{
    $inicio = Carbon::create($anio, $mes, 1)->startOfMonth();
    $fin = Carbon::create($anio, $mes, 1)->endOfMonth();

    $closetIds = Closet::where('user_id', $id)->pluck('id');

    $outfitIds = Outfit::whereIn('closet_id', $closetIds)->pluck('id');

    $eventos = Calendario::with('outfit')
        ->whereIn('outfit_id', $outfitIds)
        ->whereBetween('fecha_inicio', [$inicio, $fin])
        ->get();

    return $eventos;
}

}
