<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compartido;
use App\Models\Closet;
use App\Models\User;

class CompartidoController extends Controller
{

    //para obtener todos los closets que le han compartido a ese user
    function getCompartidos($invitado) {
         
        $closetsId = Compartido::where('user_id', $invitado)->pluck('closet_id');

        $closets = Closet::whereIn('id', $closetsId)->get();

        //les agrego la distincion de compartidos

        foreach($closets as $closet){
            $closet->compartido=true;
        }
         return $closets;
     }

     /*
    function updateCompartido(Request $request, $id) {
        
        $compartido = Compartido::find($id);
        $compartido->update($request->all());
  
        return $compartido;
    }

    function getCompartido($id){
        $compartido = Compartido::find($id); 
        return $compartido;
    }
    */

    function compartirCloset(Request $request){
        
        //recibo id del closet a compartir y el correo del invitado
        $validated = $request->validate([
            'closet_id' => 'required|exists:closets,id',
            'correo' => 'required|email'
        ]);
    
        //busco el usuario registrado con el correo dado
        $invitado = User::where('email', $validated['correo'])->first();
    
        //si el correo no esta en la bd, no hay usuario con ese correo

        if (!$invitado) {
            return response()->json(['mensaje' => 'El usuario no existe.'], 404);
        }
    
        //tambien revisamos si el closet yua fue compartido anteriormente con ese user
        $yaCompartido = Compartido::where('closet_id', $validated['closet_id'])
            ->where('user_id', $invitado->id)
            ->exists();
    
        if ($yaCompartido) {
            return response()->json(['mensaje' => 'Este closet ya fue compartido con este usuario.'], 409);
        }
    
        //si es la primera ez que se comparte con ese correo y el user existe, registro los datos 
        Compartido::create([
            'closet_id' => $validated['closet_id'],
            'user_id' => $invitado->id
        ]);
    
        return response()->json(['mensaje' => 'Closet compartido exitosamente.']);
    }
        
    /*
    function deleteCompartido($id){
        $compartido = Compartido::find($id);
        $compartido->delete();

        return $compartido;
    }*/
}
