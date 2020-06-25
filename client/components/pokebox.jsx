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

  // this method was to add pokemon to our database initially
  // getPokemonToFillDatabase() {
  //   const pokemons = this.state.pokemons;
  //   for (let i = 1; i <= 151; i++) {
  //     fetch('https://pokeapi.co/api/v2/pokemon/' + i)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('data', data);
  //         let pork;
  //         let cow;
  //         if (data.types.length > 1) {
  //           pork = {
  //             id: data.id,
  //             height: data.height,
  //             weight: data.weight,
  //             name: data.name,
  //             sprite_back_default: data.sprites.back_default,
  //             sprite_front_default: data.sprites.front_default,
  //             sprite_front_shiny: data.sprites.front_shiny,
  //             sprite_back_shiny: data.sprites.back_shiny,
  //             type: data.types[0].type.name,
  //             type_secondary: data.types[1].type.name
  //           };
  //           console.log(pork);
  //         } else {
  //           pork = {
  //             id: data.id,
  //             height: data.height,
  //             weight: data.weight,
  //             name: data.name,
  //             sprite_back_default: data.sprites.back_default,
  //             sprite_front_default: data.sprites.front_default,
  //             sprite_front_shiny: data.sprites.front_shiny,
  //             sprite_back_shiny: data.sprites.back_shiny,
  //             type: data.types[0].type.name
  //           };
  //         }
  //         fetch(data.species.url)
  //           .then(response => response.json())
  //           .then(data2 => {
  //             cow = {
  //               base_happiness: data2.base_happiness,
  //               capture_rate: data2.capture_rate,
  //               flavor_text: data2.flavor_text_entries[0].flavor_text,
  //               flavor_text_new: data2.flavor_text_entries[7].flavor_text,
  //               species: data2.genera[7].genus,
  //               growth_rate: data2.growth_rate.name,
  //               habitat: data2.habitat.name
  //             };
  //             const fool = { ...pork, ...cow };
  //             console.log('foo', fool);
  //             return fool;
  //           })
  //           .then(pokemon => {
  //             this.addToDex(pokemon);
  //             pokemons.push(pokemon);
  //             this.setState({ pokemons: pokemons });
  //             console.log(this.state.pokemons);
  //           });
  //       });
  //   }
  // }

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
