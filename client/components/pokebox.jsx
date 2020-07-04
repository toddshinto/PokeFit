import React from 'react';
import PokemonListItem from './pokemon-list-item';
import PokemonDetails from './pokemon-details';
import { AppContext } from './app-context';

export default class Pokebox extends React.Component {
  render() {
    const pokemons = this.context.pokemons;
    return (
      <div className="pokedex-body">
        <PokemonDetails />
        <div className="pokedex-screen-container" >
          <div className="pokedex-rectangle-screen">
            <div className="pokedex-headline">POKéBOX</div>
            <div className="pokemon-list">
              { pokemons.length > 0
                ? pokemons.map(pokemon =>
                  <PokemonListItem
                    key={pokemons.indexOf(pokemon)}
                    pokemon={pokemon}
                    number={pokemons.indexOf(pokemon)}/>
                )
                : <div style={{ marginTop: '10px' }}>NO POKéMON FOUND :(</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Pokebox.contextType = AppContext;
