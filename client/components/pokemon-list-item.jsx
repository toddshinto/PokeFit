import React from 'react';

export default class PokemonListItem extends React.Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="pokemon-list-item">
        <span>{(this.props.key + 1)}. </span>
        {pokemon.name}
      </div>
    );
  }
}
