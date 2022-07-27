<?php

namespace App\Imports;

use App\Models\Foititis;
use App\Models\Foreas;
use App\Models\Gender;
use App\Models\Tmima;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class UsersImport implements ToModel, WithHeadingRow 
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        
         $tmima = Tmima::where('name', "LIKE", "%".$row['TMIMA']."%")->pluck('tmima_id');
        //  dd($tmima);
         $foreas= Foreas::where("name", "LIKE", "%".$row["FOREAS"]."%")->get()->pluck('foreas_id');
         $gender = Gender::where("name", "LIKE", "%".$row["FYLO"]."%")->get()->pluck('gender_id');
         
        

          $row["TMIMA"] = $tmima[0];
         $row["FOREAS"] = $foreas[0];
         $row["FYLO"] = $gender[0];

         $imerominia_enarxis = date('Y-m-d H:i:s', strtotime($row["ENARXI PRAKTIKIS ASKISIS"]));
         $imerominia_lixis = date('Y-m-d H:i:s', strtotime($row["LIKSI PRAKTIKIS ASKISIS"]));
         
        return new Foititis([
           'tmima_id' => $row["TMIMA"],
            'am'     => $row["AM"],
            'afm'     => $row["AFM"],
            'amka'     => $row["AMKA"],
            'phone'  => $row["TILEFWNO"],
            'email'     => $row["EMAIL"],
            'name'     => $row["ONOMA"],
            'imerominia_enarxis'     => $imerominia_enarxis,
            'imerominia_lixis'     => $imerominia_lixis,
            'foreas_id' => $row["FOREAS"],
            'gender_id'=> $row["FYLO"],
           
           
        ]);
    }
}
