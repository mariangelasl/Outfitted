<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstiloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        //DATOS TABLA ESTILOS

        DB::table('estilos')->insert([
            'nombre' => 'formal'
        ]);

        DB::table('estilos')->insert([
            'nombre' => 'semi-formal'
        ]);

        DB::table('estilos')->insert([
            'nombre' => 'casual'
        ]);

        DB::table('estilos')->insert([
            'nombre' => 'deportivo'
        ]);        

        DB::table('estilos')->insert([
            'nombre' => 'playero'
        ]);

        DB::table('estilos')->insert([
            'nombre' => 'ropa de hogar'
        ]);

    }
}
