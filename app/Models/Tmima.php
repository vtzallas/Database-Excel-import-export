<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tmima extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
        
    ];

    public function foititis()
    {
        return $this->belongsTo(Foititis::class, 'tmima_id','tmima_id');
    }
}
