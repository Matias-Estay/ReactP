<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    public function index()
    {
        return view('index');
    }
    
    public function get_pokemones(){
        $data = DB::SELECT("SELECT * FROM pokemones");
        return $data;
    }
}
