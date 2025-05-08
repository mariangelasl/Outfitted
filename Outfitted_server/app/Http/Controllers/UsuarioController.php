<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsuarioController extends Controller
{
    //

    function getUsuarios() {
        return User::all();
     }

    function updateUsuario(Request $request, $id) {
        
        $usuario = User::find($id);
        $usuario->update($request->all());
  
        return $usuario;
    }

    function getUsuario($id){
        $usuario = User::find($id); 
        return $usuario;
    }

    function createUsuario(Request $request){
        
        $usuario = User::create($request->all());
        return $usuario;
        
    }

    function deleteUsuario($id){
        $usuario = User::find($id);
        $usuario->delete();

        return $usuario;
    }
}
