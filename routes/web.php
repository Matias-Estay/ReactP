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

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/index', [App\Http\Controllers\IndexController::class, 'index'])->name('index');
Route::get('/Pokemons', [App\Http\Controllers\IndexController::class, 'get_pokemons']);
Route::get('/DataPokemon', [App\Http\Controllers\IndexController::class, 'get_datapokemon']);
Route::get('/DataPokemonTableE', [App\Http\Controllers\IndexController::class, 'get_datapokemontableE']);
Route::get('/DataPokemonTableW', [App\Http\Controllers\IndexController::class, 'get_datapokemontableW']);
Route::post('/AddFavorite', [App\Http\Controllers\HomeController::class, 'addtofavorites']);
