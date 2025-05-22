<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClosetController;
use App\Http\Controllers\CompartidoController;
use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\EstiloController;
use App\Http\Controllers\OutfitController;
use App\Http\Controllers\PrendaController;
use App\Http\Controllers\TemporadaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegistroController;


//rutas para login y registro

Route::post('/registro', [RegistroController::class, 'registrar']);

Route::post('/login', [LoginController::class, 'login']);

Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/login/usuario/{correo}', [LoginController::class, 'esUsuario']);

Route::get('/registro/yaRegistrado/{correo}', [RegistroController::class, 'yaRegistrado']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//calendario

Route::get('/calendario/usuario/{usuarioId}/{mes}/{anyo}', [CalendarioController::class, 'eventosMes']);

Route::post('/calendario/create', [CalendarioController::class, 'crearEvento']);


//categoria


Route::get('/categorias', [CategoriaController::class, 'getCategorias']);

Route::get('/categoria/{id}', [CategoriaController::class, 'getCategoria']);


//closet


Route::get('/closets/{id}', [ClosetController::class, 'getClosets']);

Route::put('/closet/{id}', [ClosetController::class, 'updateCloset']);

Route::get('/closet/{id}', [ClosetController::class, 'getCloset']);

Route::post('/closet/create', [ClosetController::class, 'createCloset']);

Route::delete('/closet/{id}/delete' , [ClosetController::class, 'deleteCloset']);


//compartido


Route::get('/compartidos/{userid}', [CompartidoController::class, 'getCompartidos']);

Route::post('/compartido/create', [CompartidoController::class, 'compartirCloset']);


Route::put('/compartido/{id}', [CompartidoController::class, 'updateCompartido']);

Route::get('/compartido/{id}', [CompartidoController::class, 'getCompartido']);

Route::delete('/compartido/{id}' , [CompartidoController::class, 'deleteCompartido']);


//estadisticas

Route::get('/estadistica/{id}', [EstadisticaController::class, 'getEstadistica']);

Route::get('/estadistica/mas-usada/{id}', [EstadisticaController::class, 'getMasUsada']);

Route::get('/estadistica/menos-usada/{id}', [EstadisticaController::class, 'getMenosUsada']);

Route::get('/estadistica/color/{id}', [EstadisticaController::class, 'getColor']);

Route::get('/estadistica/outfits/{id}', [EstadisticaController::class, 'outfitSinUsar']);

Route::get('/estadistica/prendas/{id}', [EstadisticaController::class, 'prendaSinUsar']);


//estilos

Route::get('/estilos', [EstiloController::class, 'getEstilos']);

Route::get('/estilo/{id}', [EstiloController::class, 'getEstilo']);


//outfits


Route::get('/outfits/{id}', [OutfitController::class, 'getOutfits']);

Route::get('/outfit/{id}', [OutfitController::class, 'getOutfit']);

Route::post('/outfit/create', [OutfitController::class, 'createOutfit']);

Route::post('/outfit/update/{id}', [OutfitController::class, 'updateOutfit']);

Route::delete('/outfit/{id}' , [OutfitController::class, 'deleteOutfit']);


//prenda


Route::get('/prendas/{closetId}', [PrendaController::class, 'getPrendas']);

Route::post('/prenda/create', [PrendaController::class, 'createPrenda']);

Route::get('/prenda/{id}', [PrendaController::class, 'getPrenda']);

Route::post('/prenda/update/{id}', [PrendaController::class, 'updatePrenda']);

Route::delete('/prenda/{id}' , [PrendaController::class, 'deletePrenda']);


//temporada


Route::get('/temporadas', [TemporadaController::class, 'getTemporadas']);

Route::get('/temporada/{id}', [TemporadaController::class, 'getTemporada']);



//usuario

Route::get('/usuarios', [UsuarioController::class, 'getUsuarios']);

Route::put('/usuario/{id}', [UsuarioController::class, 'updateUsuario']);

Route::get('/usuario/{id}', [UsuarioController::class, 'getUsuario']);

Route::post('/usuario/create', [UsuarioController::class, 'createUsuario']);

Route::delete('/usuario/{id}' , [UsuarioController::class, 'deleteUsuario']);
