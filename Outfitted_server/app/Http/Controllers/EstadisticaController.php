<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estadistica;

class EstadisticaController extends Controller
{
    //

    //funciones que revisen varios datos por separado y luego en getEstadisticas aplico todas
    
    function getEstadisticas() {
        return Estadistica::all();
     }

    function updateEstadistica(Request $request, $id) {
        
        $estadistica = Estadistica::find($id);
        $estadistica->update($request->all());
  
        return $estadistica;
    }

    function getEstadistica($id){
        $estadistica = Estadistica::find($id); 
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
    }
}
