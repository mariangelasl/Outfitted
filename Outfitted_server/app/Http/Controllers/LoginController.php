<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    //iniciar sesion
    public function login(Request $request){

        //verifico email y contraseña
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        //si se puede acceder con esas credenciales
        if (Auth::attempt($credentials)) {
            
            $user = Auth::user(); //obtengo el usuario
            $token = $user->createToken('auth_token')->plainTextToken; //creo un token de acceso

            //devuelvo la informacion
            return response()->json([
                'token' => $token,
                'user' => $user,
                'message' => 'login exitoso'
                
            ],200);
            
        } else { //si no se hace login, envio un mensaje de error
         
            return response()->json(['message' => 'Datos incorrectos'], 401);

        }
    }

    //para cerrar sesion
    public function logout(Request $request){

        $request->user()->currentAccessToken()->delete(); //elimino el token actual

        return response()->json(['message' => 'Sesión cerrada exitosamente']); //notifico el cierre de sesion
    }

    public function esUsuario($correo){
        $usuario = User::where('email', $correo)->first();

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        
        return $usuario;
    }
}

