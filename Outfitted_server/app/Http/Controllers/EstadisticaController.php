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

    //estadisticas de una prenda
    function getEstadistica($prenda_id){
        $estadistica = Estadistica::find($prenda_id); 
        return $estadistica;
    }
 
    //obtengo la prenda mas usada por ese usuario
    function getMasUsada($user_id){ 

        $estadistica = Estadistica::with('prenda')
                    ->whereHas('prenda', function ($query) use ($user_id) {
                            $query->where('user_id', $user_id);
                    })
                    ->orderBy('veces', 'desc')->first();

       return $estadistica;
    }

    //obtengo la prenda menos usada por ese usuario

    function getMenosUsada($user_id){

        $estadistica = Estadistica::with('prenda')
                    ->whereHas('prenda', function ($query) use ($user_id) {
                            $query->where('user_id', $user_id);
                    })
                    ->orderBy('veces', 'asc')->first();

       return $estadistica;
    }

    //color mas usado en predas
    function getColor($user_id){

        $color = Estadistica::join('prendas', 'estadisticas.prenda_id', '=' , 'prendas.id')
        ->where('prendas.user_id', $user_id)
        ->select('prendas.color', \DB::raw('SUM(estadisticas.veces) as total_usos')) 
        ->groupBy('prendas.color')
        ->orderBy('total_usos' , 'desc')
        ->first();

        return $color;
    }

    //outfits que se crearon pero aun no han sido agregados al calendario para usarlos

    function outfitSinUsar($user_id){
        $usados = Calendario::where('user_id', $user_id)->pluck('outfit_id');

        $closetsUser = Closet::where('user_id', $user_id)->pluck('id');

        //los outfits cuyo id no este en los ids de outfits usados 
        $sinUsar = Outfit::whereNotIn('id', $usados)
                    ->whereIn('closet_id', $closetsUser)
                    ->get(); 

        return $sinUsar;
    }


    //obtenemos prendas que se han creado pero que aun no pertenecen a ningun outfit
    function prendaSinUsar($user_id){

        //ids de las prendas que se han usado
        $usadas = DB::table('outfit_prenda')->pluck('prenda_id');

        $sinUsar = Prenda::where('user_id', $user_id)
                ->whereNotIn('id', $usadas)->get();

        return $sinUsar;
    }


    //outfits que se crearon hace una semana y aun no se usan
    function outfitAntiguoSinUsar($user_id){
        $usados = Calendario::where('user_id', $user_id)->pluck('outfit_id');

        $haceUnaSemana = Carbon::now()->subDays(7);

        $sinUsar = Outfit::whereNotIn('id', $usados)
                    ->where('created_at', '=>', $haceUnaSemana)
                    ->get();

        return $sinUsar->pluck('nombre');
    }

}
