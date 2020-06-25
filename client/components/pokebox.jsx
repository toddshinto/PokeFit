import React from 'react';

export default class Pokebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      viewDetails: this.state.pokemon[0]
    };
    this.getPokemon = this.getPokemon.bind(this);
  }

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon() {
    fetch('/api/pokeboxes')
      .then(response => response.json())
      .then(data => this.setState({ pokemon: data }));
  }

  setViewDetails(index) {
    this.setState({ viewDetails: this.state.pokemon[index] });
  }

  render() {
    const pokemon = this.state.pokemon;
    return (
      <div>
        <h1>Pokebox</h1>

        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
