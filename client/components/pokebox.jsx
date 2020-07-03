import React from 'react';
import PokemonListItem from './pokemon-list-item';
import PokemonDetails from './pokemon-details';

export default class Pokebox extends React.Component {
  render() {
    const pokemons = this.props.pokemons;
    return (
      <div className="pokedex-body">
        <PokemonDetails
          openDrawer={this.props.openDrawer}
          closeDrawer={this.props.closeDrawer}
          setAction={this.props.setAction}
          opened={this.props.opened}
          action={this.props.action}
          timeOfDay={this.props.timeOfDay}
          pokemon={this.props.pokemonDetails}
          getPokemon={this.props.getPokemon}
          setPokemonDetails={this.props.setPokemonDetails}
          backgroundImage={this.props.backgroundImage}
          setView={this.props.setView}/>
        <div className="pokedex-screen-container" >
          <div className="pokedex-rectangle-screen">
            <div className="pokedex-headline">POKéBOX</div>
            <div className="pokemon-list">
              { pokemons.length > 0
                ? pokemons.map(pokemon =>
                  <PokemonListItem
                    key={pokemons.indexOf(pokemon)}
                    pokemon={pokemon}
                    setPokemonDetails={this.props.setPokemonDetails}
                    number={pokemons.indexOf(pokemon)}/>
                )
                : <div style={{ marginTop: '10px' }}>NO POKéMON FOUND :(</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
