<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estilo;

class EstiloController extends Controller
{
    function getEstilos() {
        return Estilo::all();
    }

    function getEstilo($id){
        $estilo = Estilo::find($id); 
        return $estilo;
    }

}
