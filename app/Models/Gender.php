<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gender extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
        
    ];

    public function foititis()
    {
        return $this->belongsTo(Foititis::class, 'gender_id','gender_id');
    }
}
