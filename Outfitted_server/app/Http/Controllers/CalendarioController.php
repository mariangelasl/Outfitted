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

    //añadir un outfit al calendario
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

            if($yaExistente->fechaUso < $validated['fechaInicio']){
                 $yaExistente->fechaUso = $validated['fechaInicio']; //reemplazo la fecha de uso por la mas reciente
            }
           
            $yaExistente->save(); //guardo los cambios

        } else{ //si la prenda se esta usando por primera vez

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

    //obtener los outfits de un determinado mes

    public function eventosMes($id, $mes, $anio){

    //inicio y fin del mes
    $inicio = Carbon::create($anio, $mes, 1)->startOfMonth();
    $fin = Carbon::create($anio, $mes, 1)->endOfMonth();

    $closetIds = Closet::where('user_id', $id)->pluck('id');

    $outfitIds = Outfit::whereIn('closet_id', $closetIds)->pluck('id');

    //todos los outfits del usuario cuya fechas de inicio este en ese mes
    
    $eventos = Calendario::with('outfit.closet')
        ->whereIn('outfit_id', $outfitIds)
        ->whereBetween('fechaInicio', [$inicio, $fin])
        ->get();

    return $eventos;
    }

}
