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

        //creo dos closets que le pertenecen al usuario

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
            'imagen' => 'top.jpg',
            'color' => 'rojo',
            'categoria_id' => 6,
            'temporada_id' => 2,
            'estilo_id' => 3,
            'closet_id' => $closet1->id,
            'user_id' => $usuario->id,
        ]);

        $prenda2 = Prenda::create([
            'imagen' => 'falda_jean.jpg',
            'color' => 'azul',
            'categoria_id' => 4,
            'temporada_id' => 2,
            'estilo_id' => 3,
            'closet_id' => $closet1->id,
            'user_id' => $usuario->id,
        ]);

        $prenda3 = Prenda::create([
            'imagen' => 'zapato.avif',
            'color' => 'rojo',
            'categoria_id' => 7,
            'temporada_id' => 2,
            'estilo_id' => 4,
            'closet_id' => $closet1->id,
            'user_id' => $usuario->id,
        ]);


        //creo un outfit con esas prendas

        $outfit1 = Outfit::create([
            'nombre' => 'Outfit picnic',
            'closet_id' => $closet1->id,
        ]);

        // Asociar prendas al outfit
        $outfit1->prendas()->attach([$prenda1->id, $prenda2->id, $prenda3->id]);


        //agregar el outfit al calendario

        Calendario::create([
            'fechaInicio' => now()->addDays(2), //en dos dias a partir de hoy
            'fechaFin' => now()->addDays(4),
            'user_id' => $usuario->id,
            'outfit_id' => $outfit1->id
        ]);

        //creo estadisticas de prueba para las prendas

        Estadistica::create([
            'fechaUso' => now(),
            'veces' => 3,
            'prenda_id' => $prenda1->id
        ]);

        Estadistica::create([
            'fechaUso' => now(),
            'veces' => 1,
            'prenda_id' => $prenda2->id
        ]);

        Estadistica::create([
            'fechaUso' => now(),
            'veces' => 2,
            'prenda_id' => $prenda3->id
        ]);


        //creo prendas y outfit closet2

        $prenda4 = Prenda::create([
            'imagen' => 'camisa.jpg',
            'color' => 'blanca',
            'categoria_id' => 6,
            'temporada_id' => 2,
            'estilo_id' => 2,
            'closet_id' => $closet2->id,
            'user_id' => $usuario->id,
        ]);

        $prenda5 = Prenda::create([
            'imagen' => 'pantalon.jpg',
            'color' => 'azul oscuro',
            'categoria_id' => 2,
            'temporada_id' => 1,
            'estilo_id' => 2,
            'closet_id' => $closet2->id,
            'user_id' => $usuario->id,
        ]);

        $prenda6 = Prenda::create([
            'imagen' => 'zapatos_blancos.avif',
            'color' => 'blancos con corazones',
            'categoria_id' => 7,
            'temporada_id' => 2,
            'estilo_id' => 4,
            'closet_id' => $closet2->id,
            'user_id' => $usuario->id,
        ]);


        //creo un outfit con esas prendas

        $outfit2 = Outfit::create([
            'nombre' => 'Presentacion TFG',
            'closet_id' => $closet2->id,
        ]);

        // Asociar prendas al outfit
        $outfit2->prendas()->attach([$prenda4->id, $prenda5->id, $prenda6->id]);


        //agregar el outfit al calendario

        Calendario::create([
            'fechaInicio' => '2025-06-09', //poner el 9 de junio
            'fechaFin' => '2025-06-09',
            'user_id' => $usuario->id,
            'outfit_id' => $outfit2->id
        ]);

        //creo estadisticas de prueba para las prendas

        Estadistica::create([
            'fechaUso' => now(),
            'veces' => 3,
            'prenda_id' => $prenda4->id
        ]);

        Estadistica::create([
            'fechaUso' => now(),
            'veces' => 5,
            'prenda_id' => $prenda5->id
        ]);

        Estadistica::create([
            'fechaUso' => now(),
            'veces' => 4,
            'prenda_id' => $prenda6->id
        ]);
    }

}
