<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use Transbank\Webpay\WebpayPlus\Transaction;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function report(Request $data){
        $id=$data->id;
        $name=$data->name;
        return view('report',compact('id','name'));
    }

    public function addreport(Request $data){
        $user = Auth::user();
        $id_pokemon = $data->id;
        $description = $data->description;
        DB::table('reportes')->insert([
            'id_usuario' => $user->id,
            'id_pokemon' => $id_pokemon,
            'descripcion' => $description,
        ]);
        return 'OK';
    }

    public function get_pokemon_filter(){
        $data = DB::SELECT("SELECT id, nombre as label FROM pokemones");
        return $data;
    }

    public function addtofavorites(Request $data)
    {
        $user = Auth::user();
        DB::table('favoritos')->insert([
            'id_usuario' => $user->id,
            'id_pokemon' => $data->id,
        ]);
        return 'OK';
    }

    public function deletefavorite(Request $data){
        $user = Auth::user();
        DB::table('favoritos')->where('id_pokemon', '=', $data->id)->where('id_usuario','=',$user->id)->delete();
    }

}
