import React from 'react';

export default class PokemonListItem extends React.Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="list-item" onClick={() => this.props.setPokemonDetails(this.props.number)}>
        <span>{(this.props.number + 1)}. </span>
        {pokemon.name}
      </div>
    );
  }
}
