import React from 'react';

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
            <div onClick={() => this.changeView('description')}>
              <div>{pokemon.species}</div>
              <div>Type: {pokemon.type}</div>
              <div>Height: {pokemon.height}</div>
              <div>Weight: {pokemon.weight}</div>
            </div>
          );
          break;
        case 'description':
          details = (
            <div onClick={() => this.changeView('description-cont')}>
              <div>Habitat: {pokemon.habitat}</div>
              <div>{pokemon.flavorText}</div>
            </div>
          );
          break;
        case 'description-cont':
          details = (
            <div onClick={() => this.changeView('stats')}>
              <div>{pokemon.flavorTextNew}</div>
            </div>
          );
          break;
      }
      return (
        <div>
          <div>{pokemon.name}</div>
          {details}
        </div>
      );
    } else {
      return (
        <div>0</div>
      );
    }
  }
}
