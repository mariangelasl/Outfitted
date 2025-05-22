<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Outfit;

class OutfitController extends Controller
{
    //

    //Obtener todos los outfits de un determinado closet
    function getOutfits($closetId) {

        $outfits = Outfit::with('prendas')
                    ->where('closet_id', $closetId)->get();
        
        return $outfits;
     }

    //actualizar informacion del outfit 
    function updateOutfit(Request $request, $id) {
        
        $validated = $request->validate([
            'nombre' => 'required|string',
            'closet_id' => 'required|integer|exists:closets,id',
            'prendas' => 'required|array',
            'prendas.*' => 'integer|exists:prendas,id'
        ]);

        $outfit = Outfit::find($id);

        $outfit->update([
            'nombre' => $validated['nombre'],
            'closet_id' => $validated['closet_id']
        ]);

        //pone las nuevas relaciones en la tabla outfit_prenda
        $outfit->prendas()->sync($validated['prendas']);
  
        return $outfit;
    }

    //obtener un outfit por su id
    function getOutfit($id){
        $outfit = Outfit::with('prendas')->find($id); 
        return $outfit;
    }


    public function createOutfit(Request $request){
    
        $validated = $request->validate([
        'nombre' => 'required|string',
        'closet_id' => 'required|integer|exists:closets,id',
        'prendas' => 'required|array',
        'prendas.*' => 'integer|exists:prendas,id'
        ]);

        $outfit = Outfit::create([
            'nombre' => $validated['nombre'],
            'closet_id' => $validated['closet_id']
        ]);

        //relaciona el outfit con cada prenda (tabla outfit_prenda)
        $outfit->prendas()->attach($validated['prendas']);

        return $outfit;
    }


    function deleteOutfit($id){

        $outfit = Outfit::find($id);

        //elimina la relacion de las prendas con el outfit a eliminar (en la tabla outfit_prenda)
        $outfit->prendas()->detach();

        //elimina el outfit
        $outfit->delete();

        return $outfit;
    }
}
