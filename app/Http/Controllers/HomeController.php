<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
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
    public function index()
    {
        return view('index');
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


}
