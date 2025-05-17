<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Closet extends Model
{
    //
    protected $guarded = [];
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function prendas(): HasMany
    {
        return $this->hasMany(Prenda::class);
    }

    public function outfits(): HasMany
    {
        return $this->hasMany(Outfit::class);
    }

    /*
    protected $appends = ['compartido'];

    public function getCompartidoAttribute(){
        
        $userId = auth()->id(); 
        return Compartido::where('closet_id', $this->id)
                    ->where('user_id', $userId)
                    ->exists();
    }*/

}
