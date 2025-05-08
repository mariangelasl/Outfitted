<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prendas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('imagen');
            $table->string('color');
            //$table->date('fechaAgregado');
            $table->foreignId('categoria_id')->constrained();
            $table->foreignId('temporada_id')->constrained();
            $table->foreignId('estilo_id')->constrained();
            $table->foreignId('closet_id')->constrained();
            $table->foreignId('user_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prendas');
    }
};
