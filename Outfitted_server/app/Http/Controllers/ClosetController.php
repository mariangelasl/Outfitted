<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Closet;

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
    function getCloset($id){
        $closet = Closet::find($id); 
        return $closet;
    }

    //crear un closet
    function createCloset(Request $request){
        
        $closet = Closet::create($request->all());
        return $closet;
        
    }

    //eliminar un closet
    function deleteCloset($id){
        $closet = Closet::find($id);
        $closet->delete();

        return $closet;
    }
}
