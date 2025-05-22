<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Closet;
use App\Models\Prenda;
use App\Models\Outfit;
use App\Models\Calendario;
use App\Models\Estadistica;
use App\Models\Compartido;

class DatosPruebaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    
        //creo un usuario de prueba

        $usuario = User::create([
            'name' => 'Usuario Prueba',
            'email' => 'prueba@email.com',
            'password' => Hash::make('12345678'),
            'rol' => 2,
        ]);

        //usuario invitado

         $invitado = User::create([
            'name' => 'Invitado',
            'email' => 'invitado@email.com',
            'password' => Hash::make('12345678'),
            'rol' => 2,
        ]);

        //creo dos closets

         $closet1 = Closet::create([
            'nombre' => 'Closet verano',
            'user_id' => $usuario->id
        ]);

        $closet2 = Closet::create([
            'nombre' => 'Closet oficina',
            'user_id' => $usuario->id
        ]);


        //comparto el closet verano (closet 1) con el invitado

        Compartido::create([
            'closet_id' => $closet1->id,
            'user_id' => $invitado->id
        ]);


        //creo algunas prendas en el closet 1

        //las imagenes para los datos de prueba estan en la carpeta uploads

        $prenda1 = Prenda::create([
            'imagen' => 'outfit1.jpg',
            'color' => 'rojo',
            'categoria_id' => 1,
            'temporada_id' => 1,
            'estilo_id' => 1,
            'closet_id' => $closet1->id,
            'user_id' => $usuario->id,
        ]);

         $prenda2 = Prenda::create([
            'imagen' => 'outfit2.jpg',
            'color' => 'azul',
            'categoria_id' => 2,
            'temporada_id' => 2,
            'estilo_id' => 2,
            'closet_id' => $closet1->id,
            'user_id' => $usuario->id,
        ]);


        //creo un outfit con esas prendas

        $outfit = Outfit::create([
            'nombre' => 'Outfit playa',
            'closet_id' => $closet1->id,
        ]);

        // Asociar prendas al outfit
        $outfit->prendas()->attach([$prenda1->id, $prenda2->id]);


        //agregar el outfit al calendario

        Calendario::create([
            'fechaInicio' => now()->addDays(2),
            'fechaFin' => now()->addDays(4),
            'user_id' => $usuario->id,
            'outfit_id' => $outfit->id
        ]);

        //creo estadisticas de prueba para las prendas

        Estadistica::create([
            'fecha_uso' => now(),
            'veces' => 3,
            'prenda_id' => $prenda1->id
        ]);

        Estadistica::create([
            'fecha_uso' => now(),
            'veces' => 1,
            'prenda_id' => $prenda2->id
        ]);
    }

}
