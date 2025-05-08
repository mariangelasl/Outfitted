<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemporadaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        //DATOS TABLA TEMPORADAS

        DB::table('temporadas')->insert([
            'nombre' => 'primavera'
        ]);

        DB::table('temporadas')->insert([
            'nombre' => 'verano'
        ]);

        DB::table('temporadas')->insert([
            'nombre' => 'otoño'
        ]);

        DB::table('temporadas')->insert([
            'nombre' => 'invierno'
        ]);        



    }
}
