<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
class IndexController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function table_types()
    {
        return view('types');
    }

    public function pokedex(Request $data){
        $id=$data->id;
        return view('pokedex',compact('id'));
    }

    public function get_pokemons(){
        $data = DB::SELECT("SELECT p.id, p.pokedex, p.nombre, p.id_tipo_1, p.id_tipo_2, p.sprite, p.generacion,
        (select fav.id_pokemon from favoritos as fav where p.id=fav.id_pokemon) as favorite
        FROM pokemones as p order by p.pokedex");
        return $data;
    }

    public function get_datapokemon(Request $data){
        $user = Auth::user();
        if($user==null){
            $data = DB::SELECT("SELECT p.pokedex, p.nombre, p.id_tipo_1, p.id_tipo_2,
            p.habilidad_1, habilidad_2, p.habilidad_3, p.hp,
            p.ataque as atk, p.defensa as def, p.sp_ataque as sp_atk, p.sp_defensa as sp_def,
            p.velocidad as spd, p.exp_100 as exp_max, p.legendario, p.mega,
            p.alola, p.galarian, p.variante, p.altura,
            p.peso, p.sprite, p.generacion, t.nombre as tipo_1,
            t.color as tipo_1_color, t.color_letra as tipo_1_color_l,  t2.nombre as tipo_2, t2.color as tipo_2_color, t2.color_letra as tipo_2_color_l,
            h1t.nombre as h1n, h1t.descripcion as h1d, h2t.nombre as h2n, h2t.descripcion as h2d,
            h3t.nombre as h3n, h3t.descripcion as h3d,
            '-1' as favorite
            FROM pokemones as p
            inner join tipos as t on p.id_tipo_1= t.id
            inner join tipos as t2 on p.id_tipo_2=t2.id
            left join habilidades as h1t on p.habilidad_1=h1t.id
            left join habilidades as h2t on p.habilidad_2=h2t.id
            left join habilidades as h3t on p.habilidad_3=h3t.id
            where p.id=$data->id;");
        }else{
            $data = DB::SELECT("SELECT p.pokedex, p.nombre, p.id_tipo_1, p.id_tipo_2,
            p.habilidad_1, habilidad_2, p.habilidad_3, p.hp,
            p.ataque as atk, p.defensa as def, p.sp_ataque as sp_atk, p.sp_defensa as sp_def,
            p.velocidad as spd, p.exp_100 as exp_max, p.legendario, p.mega,
            p.alola, p.galarian, p.variante, p.altura,
            p.peso, p.sprite, p.generacion, t.nombre as tipo_1,
            t.color as tipo_1_color, t.color_letra as tipo_1_color_l,  t2.nombre as tipo_2, t2.color as tipo_2_color, t2.color_letra as tipo_2_color_l,
            h1t.nombre as h1n, h1t.descripcion as h1d, h2t.nombre as h2n, h2t.descripcion as h2d,
            h3t.nombre as h3n, h3t.descripcion as h3d,
            (SELECT id from favoritos where id_usuario=$user->id and id_pokemon=$data->id) as favorite
            FROM pokemones as p
            inner join tipos as t on p.id_tipo_1= t.id
            inner join tipos as t2 on p.id_tipo_2=t2.id
            inner join habilidades as h1t on p.habilidad_1=h1t.id
            inner join habilidades as h2t on p.habilidad_2=h2t.id
            inner join habilidades as h3t on p.habilidad_3=h3t.id
            where p.id=$data->id;");
        }
        return $data;
    }

    public function get_datapokemontableE(Request $data){
        $effective_1 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'type',
        (SELECT t2.color FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'color_type',
        t.nombre as efective, t.color , t.color_letra, e.multiplicador as multiplier
        FROM efectividades as e
        inner join pokemones as p on p.id_tipo_1=e.id_tipo
        inner join tipos as t on e.id_tipo_efectivo=t.id
        where p.id=$data->id and e.multiplicador>=2");

        $effective_2 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'type',
        (SELECT t2.color FROM tipos as t2 WHERE t2.id = e.id_tipo) as 'color_type',
        t.nombre as efective, t.color , t.color_letra, e.multiplicador as multiplier
        FROM efectividades as e
        inner join pokemones as p on p.id_tipo_2=e.id_tipo
        inner join tipos as t on e.id_tipo_efectivo=t.id
        where p.id=$data->id and e.multiplicador>=2;");

        return [$effective_1, $effective_2];
    }

    // public function get_datapokemontableW(Request $data){
    //     $weakness_1 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = p.id_tipo_1) as 'type',
    //     (SELECT t2.color FROM tipos as t2 WHERE t2.id = p.id_tipo_1) as 'color_type',
    //     t.nombre as efective, t.color , e.multiplicador as multiplier
    //     FROM pokemon.efectividades as e
    //     inner join pokemones as p on p.id_tipo_1=e.id_tipo_efectivo
    //     inner join tipos as t on e.id_tipo=t.id
	// 	where e.id_tipo!=p.id_tipo_2 and p.id=$data->id");

    //     $weakness_2 = DB::SELECT("SELECT (SELECT t2.nombre FROM tipos as t2 WHERE t2.id = p.id_tipo_2) as 'type',
    //     (SELECT t2.color FROM tipos as t2 WHERE t2.id = p.id_tipo_2) as 'color_type',
    //     t.nombre as efective, t.color , e.multiplicador as multiplier
    //     FROM pokemon.efectividades as e
    //     inner join pokemones as p on p.id_tipo_2=e.id_tipo_efectivo
    //     inner join tipos as t on e.id_tipo=t.id
	// 	where e.id_tipo!=p.id_tipo_1 and  p.id_tipo_2!=0 and p.id=$data->id");

    //     return [$weakness_1, $weakness_2];
    // }

    public function get_types(){
        $data = DB::SELECT("SELECT * from tipos where tipos.nombre<>'' order by tipos.nombre");
        return $data;
    }

    public function get_generations(){
        $data = DB::SELECT("SELECT p.generacion FROM pokemones as p group by p.generacion order by p.generacion;");
        return $data;
    }

    public function get_typesweakness(Request $data){
        $d1 = DB::SELECT("SELECT t.*, ef.multiplicador FROM (SELECT e.id_tipo, e.multiplicador FROM efectividades as e where e.id_tipo_efectivo=$data->type_1 and e.id_tipo_efectivo<>0 ) as ef inner join tipos as t on ef.id_tipo=t.id");
        $d2 = DB::SELECT("SELECT t.*, ef.multiplicador FROM (SELECT e.id_tipo, e.multiplicador FROM efectividades as e where e.id_tipo_efectivo=$data->type_2 and e.id_tipo_efectivo<>0 ) as ef inner join tipos as t on ef.id_tipo=t.id");
        $dfinal = array_merge($d1,$d2);
        $inmune=[];
        $inmune = array_filter($dfinal, function($item){
            return $item->multiplicador == 0;
        });
        usort($inmune , function ($a, $b) {
            return $a->id>=$b->id;
        });
        $very_resistant=[];
        $resistant = array_filter($dfinal, function($item){
            return $item->multiplicador == 0.5;
        });
        usort($resistant , function ($a, $b) {
            return $a->id>=$b->id;
        });
        $resistant = array_values($resistant);
        $efective = array_filter($dfinal, function($item){
            return $item->multiplicador == 2;
        });
        usort($efective , function ($a, $b) {
            return $a->id>=$b->id;
        });
        $efective = array_values($efective);
        $very_efective=[];
        for($i =1;$i<sizeof($resistant);$i++){
            if($resistant[$i]->id==$resistant[$i-1]->id){
                $resistant[$i]->multiplicador=0.25;
                array_push($very_resistant,$resistant[$i]);
                unset($resistant[$i]);
                unset($resistant[$i-1]);
                $resistant = array_values($resistant);
                $i=0;
            }
        }
        for($i =1;$i<sizeof($efective);$i++){
            if($efective[$i]->id==$efective[$i-1]->id){
                $efective[$i]->multiplicador=4;
                array_push($very_efective,$efective[$i]);
                unset($efective[$i]);
                unset($efective[$i-1]);
                $efective = array_values($efective);
                $i=0;
            }
        }
        //Resistance vs Weakness
        for($i =0;$i<sizeof($efective);$i++){
            for($j =0;$j<sizeof($resistant);$j++){
                if($efective[$i]->id==$resistant[$j]->id){
                    unset($efective[$i]);
                    unset($resistant[$j]);
                    $efective = array_values($efective);
                    $i=0;
                }
            }
            $resistant = array_values($resistant);
        }
        //INMUNITY
        for($i =0;$i<sizeof($efective);$i++){
            for($j =0;$j<sizeof($inmune);$j++){
                if($efective[$i]->id==$inmune[$j]->id){
                    array_splice($efective,$i,1);
                }
            }
        }
        for($i =0;$i<sizeof($resistant);$i++){
            for($j =0;$j<sizeof($inmune);$j++){
                if($resistant[$i]->id==$inmune[$j]->id){
                    array_splice($resistant,$i,1);
                }
            }
        }
        return array_merge(array_merge(array_merge(array_merge([$inmune],[$very_resistant]),[$resistant]),[$efective]),[$very_efective]);
    }

    public function deletefavorite(Request $data){
        $user = Auth::user();
        DB::table('favoritos')->where('id_pokemon', '=', $data->id)->where('id_usuario','=',$user->id)->delete();
    }

    public function get_evolutions(Request $data){

        $p_base = DB::SELECT("SELECT IF(count(e.id_pokemon_evoluciona_de)>0,
        (SELECT IF(count(e2.id_pokemon_evoluciona_de)>0,
        (SELECT IF(count(e3.id_pokemon_evoluciona_de)>0,
        (SELECT IF(count(e4.id_pokemon_evoluciona_de)>0,
        e4.id_pokemon_evoluciona_de,e3.id_pokemon_evoluciona_de) as base FROM evoluciones e4 WHERE e4.id_pokemon=e3.id_pokemon_evoluciona_de),
        e2.id_pokemon_evoluciona_de) as base FROM evoluciones as e3 WHERE e3.id_pokemon=e2.id_pokemon_evoluciona_de),
        e.id_pokemon_evoluciona_de) as base FROM evoluciones as e2 WHERE e2.id_pokemon=e.id_pokemon_evoluciona_de),$data->id)
        as base FROM evoluciones as e WHERE e.id_pokemon = $data->id;");

        $p_evolutions=DB::SELECT("SELECT p.id, p.nombre, p.sprite, o.nombre as nombre_o, o.sprite as sprite_o from evoluciones as e inner join pokemones as p on p.id = e.id_pokemon inner join objetos as o on o.id=e.id_item where e.id_pokemon_evoluciona_de=".$p_base[0]->base.";");

        $p_ev_0 = DB::SELECT("SELECT p.sprite, p.id, p.pokedex, p.nombre, e_nivel.nivel, e_nivel.condicion, o.nombre as item, o.sprite as sprite_item,o2.nombre as item_2, o2.sprite as sprite_item_2, p.alola, p.hisui, p.galarian, p.paldea, p.mega FROM pokemones as p inner join evoluciones as e_nivel on e_nivel.id_pokemon_evoluciona_de=".$p_base[0]->base." inner join objetos as o on o.id=e_nivel.id_item inner join objetos as o2 on o2.id=e_nivel.id_item_2 WHERE p.id=".$p_base[0]->base." order by e_nivel.id_pokemon;");
        $p_ev_1= DB::SELECT("SELECT p1.id , p1.nombre, p1.sprite, p1.pokedex, e_nivel.nivel, e_nivel.condicion, o.nombre as item, o.sprite as sprite_item, o2.nombre as item_2, o2.sprite as sprite_item_2, p1.alola, p1.hisui, p1.galarian, p1.galarian, p1.paldea, p1.mega FROM evoluciones as e1 inner join (SELECT p.id, p.nombre, p.sprite FROM pokemones as p WHERE p.id=".$p_base[0]->base.") as R on e1.id_pokemon_evoluciona_de=R.id inner join pokemones as p1 on p1.id=e1.id_pokemon
        left join evoluciones as e_nivel on e_nivel.id_pokemon_evoluciona_de = p1.id left join objetos as o on o.id=e_nivel.id_item left join objetos as o2 on o2.id=e_nivel.id_item_2 order by p1.id;");
        $p_ev_2 = DB::SELECT("SELECT p2.id, p2.pokedex, p2.nombre, p2.sprite, p2.alola, p2.hisui, p2.galarian, p2.galarian, p2.paldea, p2.mega, e3.condicion, e3.nivel, o.nombre as item, o.sprite as sprite_item,o2.nombre as item_2, o2.sprite as sprite_item_2  FROM
        (SELECT p1.id as id_sec, p1.nombre as nombre_sec, p1.sprite as sprite_sec, R.id as id_pri, R.nombre as nombre_pri, R.sprite as sprite_pri
        FROM evoluciones as e1 inner join (SELECT p.id, p.nombre, p.sprite FROM pokemones as p WHERE p.id=".$p_base[0]->base.") as R on e1.id_pokemon_evoluciona_de=R.id inner join pokemones as p1 on p1.id=e1.id_pokemon) as R1
        inner join evoluciones as e2 on e2.id_pokemon_evoluciona_de=R1.id_sec
        inner join pokemones as p2 on e2.id_pokemon=p2.id
        left join evoluciones as e3 on e3.id_pokemon_evoluciona_de=p2.id
        left join objetos as o on o.id=e3.id_item
        left join objetos as o2 on o2.id=e3.id_item_2
        order by p2.id;");
        $p_ev_3= DB::SELECT("SELECT p3.id, p3.pokedex, p3.nombre, p3.sprite, p3.alola, p3.hisui, p3.galarian, p3.galarian, p3.paldea, p3.mega, e3.nivel, o.nombre as item, o.sprite as sprite_item,o2.nombre as item_2, o2.sprite as sprite_item_2 FROM
        (SELECT p2.id as id_ter, p2.nombre as nombre_ter, p2.sprite as sprite_ter, R1.* FROM
        (SELECT p1.id as id_sec, p1.nombre as nombre_sec, p1.sprite as sprite_sec, R.id as id_pri, R.nombre as nombre_pri, R.sprite as sprite_pri
        FROM evoluciones as e1 inner join (SELECT p.id, p.nombre, p.sprite FROM pokemones as p WHERE p.id=".$p_base[0]->base.") as R on e1.id_pokemon_evoluciona_de=R.id inner join pokemones as p1 on p1.id=e1.id_pokemon) as R1
        inner join evoluciones e2 on e2.id_pokemon_evoluciona_de=R1.id_sec
        inner join pokemones p2 on e2.id_pokemon=p2.id) as R2 inner join evoluciones e3 on e3.id_pokemon_evoluciona_de = R2.id_ter
        inner join pokemones p3 on p3.id=e3.id_pokemon
        left join objetos as o on o.id=e3.id_item
        left join objetos as o2 on o2.id=e3.id_item_2 order by p3.id;");
        $p_evolutions = array_merge(array_merge(array_merge([$p_ev_0] ,[$p_ev_1]),[$p_ev_2]),[$p_ev_3]);
        return $p_evolutions;
    }
}
