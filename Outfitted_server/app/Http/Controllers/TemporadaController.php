<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Temporada;

class TemporadaController extends Controller
{
    function getTemporadas() {
        return Temporada::all();
    }

    function getTemporada($id){
        $temporada = Temporada::find($id); 
        return $temporada;
    }

}
