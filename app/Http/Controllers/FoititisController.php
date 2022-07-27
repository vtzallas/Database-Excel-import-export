<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Imports\UsersImport;
use App\Models\Foititis;
use App\Models\Foreas;
use App\Models\Gender;
use App\Models\Tmima;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Input;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class FoititisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tmima= Tmima::all();
      
       $query = Foititis::with('tmima')
       ->with('gender')
       ->with('foreas')
       ->latest();

       $foitites = QueryBuilder::for($query)
       ->allowedFilters( AllowedFilter::scope('starts_before'),AllowedFilter::scope('starts_after'),'name','afm','imerominia_enarxis','imerominia_lixis','tmima_id')->get();
     
         $searchQuery = $request->input('filter') ;
        // if (isset($searchQuery['name'])&& $searchQuery['name']!= null) {
        
        // $foitites->where('name', 'LIKE', '%' . $searchQuery['name'] . '%');
        // }

        // if (isset($searchQuery['afm'])&& $searchQuery['afm']!= null) {
        //     $foitites->where('afm', 'LIKE', '%' . $searchQuery['afm'] . '%');
        // }
        $user = auth()->user()->name;
        
        return Inertia::render('Foititis',
         [
          'foitites' => $foitites,
          'filters' => $searchQuery ,
          'tmima' => $tmima,
          'user' => $user
          
        ] );
    }
    

    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
     {
        $tmima= Tmima::all();
        $gender= Gender::all();
        $foreas= Foreas::all();
        
        return Inertia::render('Create',[
        'gender'=> $gender ,
        'tmima' => $tmima,
        'foreas'=> $foreas]
        );}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'afm' => 'required|unique:foititis,afm,|size:9',
            'amka' => 'required|unique:foititis,amka,|size:11',
            'imerominia_enarxis' => 'required|before:imerominia_lixis',
            'imerominia_lixis' => 'required|after:imerominia_enarxis',
        ]);

        $foititis = new foititis();
        
        
        
        $data= array(
            'name'=>$request->input('name'),
            'am'=>$request->input('am'),
            'phone'=>$request->input('phone'),
            'email'=>$request->input('email'),
            'afm'=>$request->input('afm'),
            'amka'=>$request->input('amka'),
            'tmima_id'=>$request->input('tmima_id'),
            'foreas_id'=>$request->input('foreas_id'),
            'gender_id'=>$request->input('gender_id'),
            'imerominia_enarxis'=> $request->input('imerominia_enarxis'),
            'imerominia_lixis'=> $request->input('imerominia_lixis'),
            
            
        );
        $foititis->create($data);
      
         session()->flash('message','O Φοιτητής αποθηκεύτηκε');
         return Redirect::to('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $foititis = Foititis::with('tmima')->with('gender')->with('foreas')->find($id);
        $tmima= Tmima::all();
        $gender= Gender::all();
        $foreas= Foreas::all();
        return Inertia::render('Edit',['foititis' => $foititis,'tmima' => $tmima ,'gender'=> $gender,'foreas'=> $foreas]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $foititis = Foititis::findOrFail($id);
        
        $foititis->name = $request->input('name');
        $foititis->am=$request->input('am');
        $foititis->phone=$request->input('phone');
        $foititis->email=$request->input('email');
        $foititis->afm=$request->input('afm');
        $foititis->amka=$request->input('amka');
        $foititis->tmima_id=$request->input('tmima_id');
        $foititis->gender_id=$request->input('gender_id');
        $foititis->foreas_id=$request->input('foreas_id');
        $foititis->imerominia_enarxis=$request->input('imerominia_enarxis');
        $foititis->imerominia_lixis=$request->input('imerominia_lixis');
        
        $foititis->save();
        session()->flash('message','Τα στοιχεία του φοιτητή επικαιροποιήθηκαν');
        return Redirect::to('/');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $foititis=Foititis::findOrFail($id);
        $foititis->delete();
        session()->flash('message','O Φοιτητής διαγράφηκε επιτυχώς');
        return Redirect::to('/');

    }


    public function fileImportExport()
    {
       return Inertia::render('Excel');
    }
   
    /**
    * @return \Illuminate\Support\Collection
    */
    public function fileImport(Request $request) 
    {

        $request->validate([
            'file' => 'required|max:10000|mimes:xlsx,xls',
        ]);
       
        Excel::import(new UsersImport, $request->file('file'));
        
        session()->flash('message','To Excel ανέβηκε επιτυχώς');
        return Redirect::to('/');
   
    }
    
}
