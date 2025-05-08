<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    
    function getCategorias() {
        return Categoria::all();
    }

    function getCategoria($id){
        $categoria = Categoria::find($id); 
        return $categoria;
    }
    
}
