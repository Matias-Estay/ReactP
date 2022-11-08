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
    
    public function get_pokemons(){
        $data = DB::SELECT("SELECT id, pokedex, nombre, sprite FROM pokemones");
        return $data;
    }

    public function get_datapokemon(Request $data){
        $data = DB::SELECT("SELECT p.pokedex, p.nombre, p.id_tipo_1, p.id_tipo_2, 
        p.habilidad_1, habilidad_2, p.habilidad_3, p.hp, 
        p.ataque as atk, p.defensa as def, p.sp_ataque as sp_atk, p.sp_defensa as sp_def, 
        p.velocidad as spd, p.exp_100 as exp_max, p.legendario, p.mega, 
        p.alola, p.galarian, p.variante, p.altura, 
        p.peso, p.sprite, p.generacion, t.nombre as tipo_1, 
        t.color as tipo_1_color,  t2.nombre as tipo_2, t2.color as tipo_2_color,
        h1t.nombre as h1n, h1t.descripcion as h1d, h2t.nombre as h2n, h2t.descripcion as h2d, 
        h3t.nombre as h3n, h3t.descripcion as h3d 
        FROM pokemones as p 
        inner join tipos as t on p.id_tipo_1= t.id 
        inner join tipos as t2 on p.id_tipo_2=t2.id 
        inner join habilidades as h1t on p.habilidad_1=h1t.id 
        inner join habilidades as h2t on p.habilidad_2=h2t.id 
        inner join habilidades as h3t on p.habilidad_3=h3t.id
        where p.id=$data->id;");

        return $data;
    }

    public function get_datapokemontableE(Request $data){
        $effective_1 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'type',
        (SELECT t2.color FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'color_type',
        t.nombre as efective, t.color , e.multiplicador as multiplier
        FROM pokemon.efectividades as e 
        inner join pokemones as p on p.id_tipo_1=e.id_tipo
        inner join tipos as t on e.id_tipo_efectivo=t.id
        where p.id=$data->id;");

        $effective_2 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'type', 
        (SELECT t2.color FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'color_type',
        t.nombre as efective, t.color , e.multiplicador as multiplier
        FROM pokemon.efectividades as e 
        inner join pokemones as p on p.id_tipo_2=e.id_tipo
        inner join tipos as t on e.id_tipo_efectivo=t.id
        where p.id=$data->id;");

        return [$effective_1, $effective_2];
    }

    public function get_datapokemontableW(Request $data){
        $weakness_1 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = p.id_tipo_1) as 'type',
        (SELECT t2.color FROM tipos as t2 WHERE t2.id = p.id_tipo_1) as 'color_type',
        t.nombre as efective, t.color , e.multiplicador as multiplier
        FROM pokemon.efectividades as e 
        inner join pokemones as p on p.id_tipo_1=e.id_tipo_efectivo
        inner join tipos as t on e.id_tipo=t.id
		where e.id_tipo!=p.id_tipo_2 and p.id=$data->id");

        $weakness_2 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = p.id_tipo_2) as 'type',
        (SELECT t2.color FROM tipos as t2 WHERE t2.id = p.id_tipo_2) as 'color_type',
        t.nombre as efective, t.color , e.multiplicador as multiplier
        FROM pokemon.efectividades as e 
        inner join pokemones as p on p.id_tipo_2=e.id_tipo_efectivo
        inner join tipos as t on e.id_tipo=t.id
		where e.id_tipo!=p.id_tipo_1 and  p.id_tipo_2!=0 and p.id=$data->id");

        return [$weakness_1, $weakness_2];
    }
    
    
    
}
