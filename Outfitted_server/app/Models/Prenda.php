<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prenda extends Model
{
    //

    protected $guarded = [];
    
    public function outfits(): BelongsToMany
    {
        return $this->belongsToMany(Outfit::class);
    }

    public function estilo(): BelongsTo
    {
        return $this->belongsTo(Estilo::class);
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    public function temporada(): BelongsTo
    {
        return $this->belongsTo(Temporada::class);
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function closet(): BelongsTo
    {
        return $this->belongsTo(Closet::class);
    }

    protected $appends = ['imagen_url'];

    //devuelve donde se encuentra la imagen de la prenda
    public function getImagenUrlAttribute(){
        return url('uploads/' . $this->imagen);
    }
}
