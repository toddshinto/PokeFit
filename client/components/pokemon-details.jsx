import React from 'react';

export default class PokemonDetails extends React.Component {
  render() {
    const pokemon = this.props.pokemon;
    if (pokemon) {
      return (
        <div>
          <div>{pokemon.name}</div>
          <div>
            <div>{pokemon.species}</div>
            <div>Type: {pokemon.type}</div>
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>No Pokemon Found</div>
      );
    }
  }
}
