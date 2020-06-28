import React from 'react';
import Menu from './menu-drawer/menu';

export default class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDetails: 'stats'
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({
      viewDetails: view
    });
  }

  render() {
    const pokemon = this.props.pokemon;
    const viewDetails = this.state.viewDetails;
    let details;
    if (pokemon) {
      switch (viewDetails) {
        case 'stats':
          details = (
            <div className="pokemon-desc" onClick={() => this.changeView('description')}>
              <div>{pokemon.species}</div>
              <div className='to-capitalize'>Type: {pokemon.type}</div>
              <div>Height: {pokemon.height}</div>
              <div>Weight: {pokemon.weight}</div>
            </div>
          );
          break;
        case 'description':
          details = (
            <div className="pokemon-desc" onClick={() => this.changeView('description-cont')}>
              <div className='to-capitalize'>Habitat: {pokemon.habitat}</div>
              <div>{pokemon.flavorText}</div>
            </div>
          );
          break;
        case 'description-cont':
          details = (
            <div className="pokemon-desc" onClick={() => this.changeView('stats')}>
              <div>{pokemon.flavorTextNew}</div>
            </div>
          );
          break;
      }
      return (
        <div className="pokemon-screen-container">
          <div className="pokemon-display-screen" style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
            <div className="first-row">
              <Menu pokemon={pokemon} setView={this.props.setView} getPokemon={this.props.getPokemon} className="menu-button"/>
              <div className="pokemon-name">{pokemon.name}</div>
            </div>
            <div className="second-row">
              <div className="pokemon-picture" style={{ backgroundImage: `url(${pokemon.spriteFrontDefault})` }} />
              {details}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>0</div>
      );
    }
  }
}
