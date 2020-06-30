import React from 'react';

export default class Encounter extends React.Component {
  render() {
    const wildPokemon = this.props.wildPokemon;
    return (
      <div className="pokedex-body">
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(assets/images/${this.props.timeOfDay}-bg.gif)` }}>
            <div className="top-screen-first-row">
              <div className="top-screen-title to-capitalize">
                {wildPokemon.name}
              </div>
            </div>
            <div className="top-screen-second-row">
              <div className="pokemon-encounter" style={{ backgroundImage: `url(${wildPokemon.sprite_front_default})` }} />
            </div>
          </div>
        </div>
        <div className="pokedex-screen-container">
          <div className="pokedex-rectangle-screen">
            <div className="encounter-actions">
              <div className="encounter-button">
                CATCH
              </div>
              <div className="encounter-button">
                ITEMS
              </div>
              <div className="encounter-button">
                RUN
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
