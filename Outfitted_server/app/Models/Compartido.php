<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compartido extends Model
{
    //
    protected $guarded = [];
    
    public function invitado()
    {
        return $this->usuario_id;
    }
}
