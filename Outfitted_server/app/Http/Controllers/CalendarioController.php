<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calendario;
use App\Models\Closet;
use App\Models\Outfit;
use App\Models\Estadistica;

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
        'fechaInicio' => 'required|date|after_or_equal:today',
        'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        'user_id'=> 'required|exists:users,id' 
    ]);

    $evento = Calendario::create($validated); 


    //despues de agregar el outfit al calendario, se agregan sus prendas a la tabla estadisticas (asi registramos su uso)


    //obtengo las prendas que conforman el outfit 
    $prendas = Outfit::find($validated['outfit_id'])->prendas;

    //agrego cada prenda a la tabla

    foreach($prendas as $prenda){

        //busco si la prenda ya fue registrada
        $yaExistente = Estadistica::where('prenda_id' , $prenda->id)->first();

        //si ya esta la prenda en la tabla
        if($yaExistente){
            $yaExistente->veces +=1; //aumento las veces que se ha usado
            $yaExistente->fechaUso = $validated['fechaInicio']; //reemplazo la fecha de uso
            $yaExistente->save(); //guardo los cambios
        } else{

            //creo el registro en la tabla

            Estadistica::create([
                'prenda_id' => $prenda->id,
                'veces' => 1,
                'fechaUso' => $validated['fechaInicio'],
            ]);
        }
    }
    return $evento;
    }  


    public function eventosMes($id, $mes, $anio){
    $inicio = Carbon::create($anio, $mes, 1)->startOfMonth();
    $fin = Carbon::create($anio, $mes, 1)->endOfMonth();

    $closetIds = Closet::where('user_id', $id)->pluck('id');

    $outfitIds = Outfit::whereIn('closet_id', $closetIds)->pluck('id');

    $eventos = Calendario::with('outfit.closet')
        ->whereIn('outfit_id', $outfitIds)
        ->whereBetween('fechaInicio', [$inicio, $fin])
        ->get();

    return $eventos;
    }

}
