<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Calendario extends Model
{
    //

    protected $guarded = [];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class);
    }

    public function outfit(): BelongsTo
    {
    return $this->belongsTo(Outfit::class);
    }
 

}
