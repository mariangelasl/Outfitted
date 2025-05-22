<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Closet;
use App\Models\Estadistica;
use App\Models\Calendario;
use App\Models\Compartido;

class ClosetController extends Controller
{
    //obtener todos los closets de ese usuario
    function getClosets($userId) {
        
        $closets= Closet::where('user_id', $userId)->get();
        return $closets;
    }
    
    //actualizar el nombre del closet
    function updateCloset(Request $request, $id) {
        
        $closet = Closet::find($id);

        //es el unico campo que el usuario puede modificar desde la web
        $closet->update($request->only(['nombre']));
  
        return $closet;
    }

    //obtener un closet por su id
    function getCloset(Request $request, $id){

        $closet = Closet::find($id);
        
        $userId = $request->query('user_id'); 

        //saber si el closet fue compartido con el usuario
        $closet->compartido = Compartido::where('closet_id', $id)
                                    ->where('user_id', $userId)
                                    ->exists();

        return response()->json($closet);
    }

    //crear un closet
    function createCloset(Request $request){
        
        $closet = Closet::create($request->all());
        return $closet;
        
    }

    //eliminar un closet
    function deleteCloset(Request $request, $id){

        ///busco el closet por su id
        $closet = Closet::find($id);

        $userId = $request->query('user_id'); 

        //es el propietario del closet, puede eliminarlo
        if ($closet->user_id == $userId) {
        
            //elimino las prendas que estaban dentro del closet
            //y sus estadisticas

            foreach ($closet->prendas as $prenda) {
                Estadistica::where('prenda_id', $prenda->id)->delete();
                $prenda->delete();
            }

        //elimino los outfits, y tambien del calendario y de la tabla outfit_prenda
        
            foreach ($closet->outfits as $outfit) {
                Calendario::where('outfit_id', $outfit->id)->delete();
                $outfit->prendas()->detach();
                $outfit->delete();
            }
        
            //elimino el compartido

            Compartido::where('closet_id', $closet->id)->delete();

            //elimino el closet
            $closet->delete();

        return $closet;
        }

        //si no es el propietario, sino un invitado, eliminamos el closet solo para el

        Compartido::where('closet_id', $closet->id)
              ->where('user_id', $userId)
              ->delete();

        return response()->json(['mensaje' => 'Closet removido de tu lista.']);
    }
}
