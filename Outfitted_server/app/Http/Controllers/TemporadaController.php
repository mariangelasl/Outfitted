<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Temporada;

class TemporadaController extends Controller
{
    //se usara este mas que todo
    function getTemporadas() {
        return Temporada::all();
    }



    function updateTemporada(Request $request, $id) {
        
        $temporada = Temporada::find($id);
        $temporada->update($request->all());
  
        return $temporada;
    }

    function getTemporada($id){
        $temporada = Temporada::find($id); 
        return $temporada;
    }

    function createTemporada(Request $request){
        
        $temporada = Temporada::create($request->all());
        return $temporada;
        
    }

    function deleteTemporada($id){
        $temporada = Temporada::find($id);
        $temporada->delete();

        return $temporada;
    }
}
