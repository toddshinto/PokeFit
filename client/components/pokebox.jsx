import React from 'react';
import PokemonListItem from './pokemon-list-item';
import PokemonDetails from './pokemon-details';

export default class Pokebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      pokemonDetails: this.state.pokemons[0]
    };
    this.getPokemon = this.getPokemon.bind(this);
    this.setPokemonDetails = this.setPokemonDetails.bind(this);
  }

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon() {
    fetch('/api/pokeboxes')
      .then(response => response.json())
      .then(data => this.setState({ pokemon: data }));
  }

  setPokemonDetails(index) {
    this.setState({ pokemonDetails: this.state.pokemons[index] });
  }

  render() {
    const pokemons = this.state.pokemons;
    return (
      <div>
        <h1>Pokebox</h1>
        <PokemonDetails pokemon={this.state.pokemonDetails} />
        <div className="pokemon-list">
          {pokemons.map(pokemon =>
            <PokemonListItem key={pokemons.indexOf(pokemon)} pokemon={pokemon} setPokemonDetails={this.setPokemonDetails} />)}
        </div>
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
