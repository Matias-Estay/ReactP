import React from 'react';
import ReactDOM from 'react-dom';
import PokemonInfo from './PokemonInfo.jsx';
function PokedexView(props){
    return(
        <>
            <PokemonInfo id={props.id} handleClose={null}/>
        </>
    )
}
export default PokedexView;

if (document.getElementById('pokedexview')) {
    const value = document.getElementById('pokedexview').getAttribute("id_pokemon");
    ReactDOM.render(<PokedexView id={value}/>, document.getElementById('pokedexview'));
}
