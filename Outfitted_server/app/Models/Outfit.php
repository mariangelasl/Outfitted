<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Outfit extends Model
{
    //

    protected $guarded = [];
    public function closet(): BelongsTo
    {
        return $this->belongsTo(Closet::class);
    }

    public function prendas(){
    return $this->belongsToMany(Prenda::class)->with('categoria', 'estilo', 'temporada');
    }
    
}
