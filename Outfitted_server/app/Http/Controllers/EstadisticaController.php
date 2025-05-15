<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estadistica;

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


    //pasar tambein el dato de cuantas veces? 

    function getMasUsada(){ //prenda mas usada

       $estadistica =  Estadistica::orderBy('veces', 'desc')->first();

       $prenda = $estadistica->prenda_id;

       //puedo buscar aqui de una la url de la imagen (con el id) y devolver url y veces de uso. para mostrar eso en el componente

       return $prenda;
    }

    function getMenosUsada(){ //prenda menos usada

       $estadistica =  Estadistica::orderBy('veces', 'asc')->first();

       $prenda = $estadistica->prenda_id;

       return $prenda;
    }

    function getColor(){ //revisar

        $color = Estadistica::join('prendas', 'estadisticas.prenda_id', '=' , 'prendas.id')
        ->select('prendas.color') //maybe veces tambien
        ->groupBy('prendas.color')
        ->orderBy('veces' , 'desc')
        ->first();

        return $color;
    }

    //maybe zapatos, accesorios, bolsos mas usados

    function getZapatos(){

        $estadistica = Estadistica::join('prendas', 'estadisticas.prenda_id', '=' , 'prendas.id')
        ->select('prendas.color')
        ->groupBy('prendas.color')
        ->orderBy('veces' , 'desc')
        ->first();

        return $estadistica;
    }

    function outfitSinUsar($closet_id){
        $outfits = Outfit::where('closet_id', $closet_id)->get();
        $sinUsar = [];
        $hoy = new Date();
        foreach($outfits as $outfit){

            $usado = Calendario::where('outfit_id', $outfit->id)->first();

            if(($hoy - $outfit->created_at > 7) && !$usado){
                $sinUsar[]= $outfit->nombre;
            }
        }

        return $sinUsar;
    }

    function outfitSinUsar2($user_id){
        $usados = Calendario::where('user_id', $user_id)->pluck('outfit_id');

        $sinUsar = Outfit::whereNotIn('id', $usados)->get(); //los outfits cuyo id no este en los outfits usados 

        return $sinUsar;
    }

    function prendaSinUsar(){

        //que no esten en la tabla outfits_prendas

        $usadas = DB::table('outfits_prendas')->pluck('prenda_id');

        $sinUsar = Prenda::whereNotIn('id', $usadas)->get();

        return $sinUsar;
    }

}
