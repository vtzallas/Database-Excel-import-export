<?php

namespace App\Exports;

use App\Models\Foititis;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{

    // public function __construct($foitites){


    // }
    
    /**
    * @return \Illuminate\Support\Collection    
    */
    public function collection()
    {
       return Foititis::all();
    }
}
