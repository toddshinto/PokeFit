import React from 'react';
import PokemonListItem from './pokemon-list-item';
import PokemonDetails from './pokemon-details';

export default class Pokebox extends React.Component {
  render() {
    const pokemons = this.props.pokemons;
    return (
      <div>
        <h1>Pokebox</h1>
        <PokemonDetails pokemon={this.props.pokemonDetails} />
        <div className="pokemon-list">
          { pokemons.length > 1
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
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
