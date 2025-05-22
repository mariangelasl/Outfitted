<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Closet;
use App\Models\Prenda;
use App\Models\Categoria;
use App\Models\Temporada;
use App\Models\Estilo;
use App\Models\Estadistica;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class PrendaController extends Controller
{

    //obtengo las prendas de un determinado closet
    function getPrendas($closet_id) {
        $prendas = Prenda::with(['categoria', 'temporada', 'estilo'])
        ->where('closet_id', $closet_id)->get();
        return $prendas;
    }

    //actualizar la info de una prenda
    function updatePrenda(Request $request, $id) {
        
        //valido lo recibido del form de edicion
        $validated = $request->validate([
            'color' => 'required|string',
            'categoria_id' => 'required|integer',
            'temporada_id' => 'required|integer',
            'estilo_id' => 'required|integer',
            'imagen' => 'file|image',
        ]);
        
        //busco la prenda
        $prenda = Prenda::find($id);  

        //si el usuario subió una nueva una imagen en el form
        if ($request->file('imagen')) {

            //busco si ya la penda tenia imagen y la elimino
            if($prenda->imagen){
                $imagenAnterior = public_path('uploads/' . $prenda->imagen);
                if (file_exists($imagenAnterior)) {
                    unlink($imagenAnterior);
                } 
            }

            //obtengo el usuario y el closet al que pertenece la prenda
            $usuario = User::find($prenda->user_id);
            $closet = Closet::find($prenda->closet_id);

            //obtengo la nueva imagen
            $file = $request->file('imagen');
            
            //le doy un nombre personalizado
            $filename = Str::slug($usuario->name, '-') . '_' . Str::slug($closet->nombre, '-'). '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            //muevo el archivo a la carpeta uploads
            $file->move(public_path('uploads/'), $filename);

            //agrego el nuevo nombre de imagen
            $validated['imagen'] = $filename;
        
        }        

        //actualizo la prenda
        $prenda->update($validated);

        return $prenda;
    }

    //obtener una prenda por su id
    function getPrenda($id){
        $prenda = Prenda::with(['categoria', 'temporada', 'estilo'])->find($id); 
        return $prenda;
    }

    //crear una prenda
    function createPrenda(Request $request){
        
        //valido los datos del form
        $validated = $request->validate([
            'color' => 'required|string',
            'categoria_id' => 'required|integer',
            'temporada_id' => 'required|integer',
            'estilo_id' => 'required|integer',
            'closet_id' => 'required|integer',
            'user_id' => 'required|integer',
            'imagen' => 'file|image',
        ]);
        
        //obtengo el usuario y el closet al que pertenece la prenda
        $usuario = User::find($validated['user_id']);
        $closet = Closet::find($validated['closet_id']);
             
        //recojo y almaceno la imagen de la prenda
        if ($request->file('imagen')) {
            $file = $request->file('imagen');

            //le doy un nombre personalizado al archivo 
            $filename = Str::slug($usuario->name, '-') . '_' . Str::slug($closet->nombre, '-'). '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $file->move(public_path('uploads/'), $filename);
            $validated['imagen'] = $filename;
        
        }
        
        //ccreo la prenda con los datos validados
        $prenda = Prenda::create($validated);
        return $prenda;
        
    }

    //eliminar una prenda y sus estadisticas de uso
    function deletePrenda($id){

        //busco la prenda
        $prenda = Prenda::find($id);

        if ($prenda->imagen) {
        //busco la imagen
            $imagen = public_path('uploads/' . $prenda->imagen);

            if (file_exists($imagen)) {
                unlink($imagen); // Elimina el archivo
            }
        }

        //elimino la prenda de estadisticas

        Estadistica::where('prenda_id', $prenda->id)->delete();

        //elimino la prenda de outfit_prenda
        $prenda->outfits()->detach();
        
        $prenda->delete(); //elimina la prenda

        return $prenda;
    }
}
