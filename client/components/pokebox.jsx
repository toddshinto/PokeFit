import React from 'react';
import PokemonListItem from './pokemon-list-item';
import PokemonDetails from './pokemon-details';

export default class Pokebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      pokemonDetails: null
    };
    this.getPokemon = this.getPokemon.bind(this);
    this.setPokemonDetails = this.setPokemonDetails.bind(this);
    this.addToDex = this.addToDex.bind(this);
  }

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon() {
    fetch('/api/pokeboxes')
      .then(response => response.json())
      .then(pokemons => {
        this.setState({ pokemons });
        this.setPokemonDetails(0);
      });
  }

  setPokemonDetails(index) {
    if (this.state.pokemons) {
      this.setState({ pokemonDetails: this.state.pokemons[index] });
    }
  }

  addToDex(pokemon) {
    fetch('/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
      .then(res => res.json())
      .then(data => (process.stdout.write(data)));
  }

  render() {
    const pokemons = this.state.pokemons;
    return (
      <div>
        <h1>Pokebox</h1>
        <PokemonDetails pokemon={this.state.pokemonDetails} />
        <div className="pokemon-list">
          {pokemons.map(pokemon =>
            <PokemonListItem key={pokemons.indexOf(pokemon)} pokemon={pokemon} setPokemonDetails={this.setPokemonDetails} number={pokemons.indexOf(pokemon)}/>)}
        </div>
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
