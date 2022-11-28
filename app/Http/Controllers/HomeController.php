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
    public function table_types()
    {
        return view('types');
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
