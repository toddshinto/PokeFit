import React from 'react';
import Menu from './menu-drawer/menu';
import { AppContext } from './app-context';

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
    const pokemon = this.context.pokemonDetails;
    let details;
    if (pokemon) {
      const viewDetails = this.state.viewDetails;
      const height = (pokemon.height / 3.048);
      const feet = Math.floor(height);
      const inches = Math.round((height - feet) * 12);
      const weight = Math.round((pokemon.weight / 4.536));
      let next;
      switch (viewDetails) {
        case 'stats':
          details = (
            <div className="pokemon-desc" style={{ marginTop: '45px' }}onClick={() => this.changeView('description')}>
              <div>{pokemon.species}</div>
              <div className='to-capitalize'>Type: {pokemon.type}</div>
              <div>{`Height: ${feet}'${inches}''`}</div>
              <div >{'Weight: '}<span className='weight'>{weight} lbs.</span></div>
            </div>
          );
          next = 'description-cont';
          break;
        case 'description':
          details = (
            <div className="pokemon-desc" onClick={() => this.changeView('description-cont')}>
              <div className='to-capitalize'>Habitat: {pokemon.habitat}</div>
              <div>{pokemon.flavorText}</div>
            </div>
          );
          next = 'stats';
          break;
        case 'description-cont':
          details = (
            <div className="pokemon-desc" onClick={() => this.changeView('stats')}>
              <div>{pokemon.flavorTextNew}</div>
            </div>
          );
          next = 'description';
          break;
      }
      return (
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(${this.context.backgroundImage})` }} >
            <div className="top-screen-first-row">
              <Menu pokemon={pokemon}
                className="menu-button"
                openDrawer={this.context.openDrawer}
                closeDrawer={this.context.closeDrawer}
                setAction={this.context.setAction}
                opened={this.context.opened}
                setPokemonDetails={this.context.setPokemonDetails}
                action={this.context.action}/>
              <div className='pokemon-ball-title' style={{ backgroundImage: `url(${pokemon.ballSprite})` }} />
              <div className="top-screen-title to-uppercase">{pokemon.name}</div>
            </div>
            <div className="top-screen-second-row" onClick={() => {
              this.context.setAction(null);
              this.context.closeDrawer();
            }}>
              <div className="top-screen-picture" style={{ backgroundImage: `url(${pokemon.spriteFrontDefault})` }} />
              {details}
              <div className="see-more" onClick={() => this.changeView(next)}></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(${this.context.backgroundImage})` }}>
            <div className="top-display-header" style={{ backgroundColor: 'yellow' }}>GO CATCH SOME POKéMON!</div>
          </div>
        </div>
      );
    }
  }
}

PokemonDetails.contextType = AppContext;
