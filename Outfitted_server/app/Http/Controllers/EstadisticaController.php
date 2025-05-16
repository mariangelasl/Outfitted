<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estadistica;
use App\Models\Calendario;
use App\Models\Outfit;
use App\Models\Prenda;
use App\Models\Closet;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;



class EstadisticaController extends Controller
{
    //

    //por id de prenda
    function getEstadistica($id){
        $estadistica = Estadistica::find($id); 
        return $estadistica;
    }

    /*
    function getEstadisticas() {
        return Estadistica::all();
     }

    function updateEstadistica(Request $request, $id) {
        
        $estadistica = Estadistica::find($id);
        $estadistica->update($request->all());
  
        return $estadistica;
    }

    function createEstadistica(Request $request){
        
        $estadistica = Estadistica::create($request->all());
        return $estadistica;
        
    }

    function deleteEstadistica($id){
        $estadistica = Estadistica::find($id);
        $estadistica->delete();

        return $estadistica;
    }*/
 

    function getMasUsada($user_id){ //prenda mas usada

       /*$estadistica =  Estadistica::with('prenda')
       ->where('prendas.user_id', $user_id)
       ->select('estadisticas.*', 'prendas.imagen as imagen_url')
       ->orderBy('estadisticas.veces', 'desc')->first();

       //dd($estadistica);
        Log::info('Mas usada', ['data' => $estadistica]);*/

        $estadistica = Estadistica::with('prenda')
                    ->whereHas('prenda', function ($query) use ($user_id) {
                            $query->where('user_id', $user_id);
                    })
                    ->orderBy('veces', 'desc')->first();
       return $estadistica;

    }

    function getMenosUsada($user_id){ //prenda menos usada

      /* $estadistica =  Estadistica::join('prendas', 'estadisticas.prenda_id', '=', 'prendas.id')
       ->where('prendas.user_id', $user_id)
       ->select('estadisticas.*', 'prendas.imagen as imagen_url')
       ->orderBy('estadisticas.veces', 'asc')->first();

        Log::info('Menos usada', ['data' => $estadistica]);*/

        $estadistica = Estadistica::with('prenda')
                    ->whereHas('prenda', function ($query) use ($user_id) {
                            $query->where('user_id', $user_id);
                    })
                    ->orderBy('veces', 'asc')->first();
       return $estadistica;
    }

    function getColor($user_id){

        $color = Estadistica::join('prendas', 'estadisticas.prenda_id', '=' , 'prendas.id')
        ->where('prendas.user_id', $user_id)
        ->select('prendas.color', \DB::raw('SUM(estadisticas.veces) as total_usos')) 
        ->groupBy('prendas.color')
        ->orderBy('total_usos' , 'desc')
        ->first();

         Log::info('color', ['data' => $color]);
        return $color;
    }



    function outfitSinUsar($user_id){
        $usados = Calendario::where('user_id', $user_id)->pluck('outfit_id');

        $closetsUser = Closet::where('user_id', $user_id)->pluck('id');

        $sinUsar = Outfit::whereNotIn('id', $usados)
                    ->whereIn('closet_id', $closetsUser)
                    ->get(); //los outfits cuyo id no este en los outfits usados 

        return $sinUsar;
    }

    function outfitAntiguoSinUsar($user_id){
        $usados = Calendario::where('user_id', $user_id)->pluck('outfit_id');

        $haceUnaSemana = Carbon::now()->subDays(7);

        $sinUsar = Outfit::whereNotIn('id', $usados)
                    ->where('created_at', '<=', $haceUnaSemana)
                    ->get();

        return $sinUsar->pluck('nombre');
    }

    function prendaSinUsar($user_id){

        //que no esten en la tabla outfits_prendas

        $usadas = DB::table('outfit_prenda')->pluck('prenda_id');

        $sinUsar = Prenda::where('user_id', $user_id)
                ->whereNotIn('id', $usadas)->get();

        return $sinUsar;
    }

}
