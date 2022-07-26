<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foreas extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
        
    ];

    public function foititis()
    {
        return $this->belongsTo(Foititis::class, 'foreas_id','foreas_id');
    }
}
