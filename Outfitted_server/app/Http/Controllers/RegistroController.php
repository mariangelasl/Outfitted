<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegistroController extends Controller
{
    //

    //registrar un nuevo usuario
    public function registrar(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => 2,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    //verificar si ya hay un usuario registrado con ese email
    
    public function yaRegistrado($correo){
        $usuario = User::where('email', $correo)->exists();

        if ($usuario) {
            return response()->json(['message' => 'Correo ya registrado'], 409);
        }
        
        return response()->json(['message' => 'Correo disponible'], 200);
}










    
    
}
