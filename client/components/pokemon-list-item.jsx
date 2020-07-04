import React from 'react';
import { AppContext } from './app-context';

export default class PokemonListItem extends React.Component {
  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="list-item to-uppercase item-row" onClick={() => this.context.setPokemonDetails(this.props.number)}>
        <span className="">{(this.props.number + 1)}. </span>
        <div className="pokemon-ball" style={{ backgroundImage: `url(${pokemon.ballSprite})` }} />
        <div style={{ width: '70%' }}>{pokemon.name}</div>
      </div>
    );
  }
}

PokemonListItem.contextType = AppContext;
