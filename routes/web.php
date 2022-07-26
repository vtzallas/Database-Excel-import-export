<?php

use App\Http\Controllers\FoititisController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/',[FoititisController::class,'index'])->name('index');;
Route::get('/create',[FoititisController::class,'create']);
Route::post('/save',[FoititisController::class,'store']);
Route::get('/edit/{id}',[FoititisController::class,'edit'])->name('edit');
Route::post('/update/{id}',[FoititisController::class,'update'])->name('update');
Route::get('/delete/{id}',[FoititisController::class,'destroy'])->name('delete');
Route::get('/query',[FoititisController::class,'index']);
Route::get('file-import-export', [FoititisController::class, 'fileImportExport']);
Route::post('file-import', [FoititisController::class, 'fileImport'])->name('import');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
