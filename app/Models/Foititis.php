<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Foititis extends Model
{
    use HasFactory;

    protected $fillable = [

        'name', 'am','phone','email','afm','amka', 'imerominia_enarxis','imerominia_lixis','tmima_id','foreas_id','gender_id'

    ];

    public function tmima()
    {
        return $this->hasOne(Tmima::class, 'tmima_id', 'tmima_id');
    }
    
    public function gender()
    {
        return $this->hasOne(Gender::class, 'gender_id', 'gender_id');
    }

    public function foreas()
    {
        return $this->hasOne(Foreas::class, 'foreas_id', 'foreas_id');
    }
    public function scopeStartsBefore(Builder $query, $date): Builder
    {
        return $query->where('imerominia_lixis', '<=', Carbon::parse($date));
    }
    
    public function scopeStartsAfter(Builder $query, $date): Builder
    {
        return $query->where('imerominia_enarxis', '>=', Carbon::parse($date));
    }
    

}
