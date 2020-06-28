import React from 'react';
import PokemonListItem from './pokemon-list-item';
import PokemonDetails from './pokemon-details';

export default class Pokebox extends React.Component {
  render() {
    const pokemons = this.props.pokemons;
    return (
      <div className="pokebox-body">
        <PokemonDetails
          pokemon={this.props.pokemonDetails}
          getPokemon={this.props.getPokemon}
          backgroundImage={this.props.backgroundImage}
          setView={this.props.setView}/>
        <div className="pokebox-screen-container">
          <div className="pokebox-rectangle-screen">
            <div className="pokebox-headline">POKéBOX</div>
            <div className="pokemon-list">
              { pokemons.length > 0
                ? pokemons.map(pokemon =>
                  <PokemonListItem
                    key={pokemons.indexOf(pokemon)}
                    pokemon={pokemon}
                    setPokemonDetails={this.props.setPokemonDetails}
                    number={pokemons.indexOf(pokemon)}/>
                )
                : <div>No Pokemon Found :(</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
