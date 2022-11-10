<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/types', [App\Http\Controllers\IndexController::class, 'table_types'])->name('table');
Route::get('/index', [App\Http\Controllers\IndexController::class, 'index'])->name('index');
Route::get('/Pokemons', [App\Http\Controllers\IndexController::class, 'get_pokemons']);
Route::get('/DataPokemon', [App\Http\Controllers\IndexController::class, 'get_datapokemon']);
Route::get('/DataPokemonTableE', [App\Http\Controllers\IndexController::class, 'get_datapokemontableE']);
Route::get('/DataPokemonTableW', [App\Http\Controllers\IndexController::class, 'get_datapokemontableW']);
Route::get('/AllTypes', [App\Http\Controllers\IndexController::class, 'get_types']);
Route::post('/AddFavorite', [App\Http\Controllers\HomeController::class, 'addtofavorites']);
Route::post('/AllTypesFilter', [App\Http\Controllers\IndexController::class, 'get_typesfilter']);
