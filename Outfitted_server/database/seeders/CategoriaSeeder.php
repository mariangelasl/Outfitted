<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        //DATOS TABLA CATEGORIAS

        DB::table('categorias')->insert([
            'nombre' => 'abrigos y chaquetas'
        ]);

        DB::table('categorias')->insert([
            'nombre' => 'pantalones'
        ]);

        DB::table('categorias')->insert([
            'nombre' => 'vestidos'
        ]);

        DB::table('categorias')->insert([
            'nombre' => 'faldas'
        ]);        

        DB::table('categorias')->insert([
            'nombre' => 'shorts'
        ]);

        DB::table('categorias')->insert([
            'nombre' => 'camisas y blusas'
        ]);

        DB::table('categorias')->insert([
            'nombre' => 'zapatos'
        ]);

        DB::table('categorias')->insert([
            'nombre' => 'accesorios'
        ]);

        DB::table('categorias')->insert([
            'nombre' => 'bolsos'
        ]);
    }
}
