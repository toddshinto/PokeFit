import React from 'react';
import PokeballListItem from './pokeball-list-item';
import BerryListItem from './berry-list-item';
import { AppContext } from './app-context';

export default class Encounter extends React.Component {
  constructor(context) {
    super(context);
    this.state = {
      catchMenu: false,
      itemMenu: false
    };
    this.closeMenus = this.closeMenus.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleItemMenu = this.toggleItemMenu.bind(this);
    this.throwBall = this.throwBall.bind(this);
    this.useBerry = this.useBerry.bind(this);
  }

  toggleMenu() {
    this.setState({ itemMenu: false });
    this.setState({ catchMenu: !this.state.catchMenu });
  }

  toggleItemMenu() {
    this.setState({ catchMenu: false });
    this.setState({ itemMenu: !this.state.itemMenu });
  }

  closeMenus() {
    this.setState({ catchMenu: false, itemMenu: false });
  }

  throwBall(ball) {
    this.toggleMenu();
    this.context.attemptCatch(ball);
  }

  useBerry(berry) {
    this.toggleItemMenu();
    this.context.attemptBerry(berry);
  }

  render() {
    const wildPokemon = this.context.wildPokemon;
    let pokeballList;
    if (this.state.catchMenu) {
      pokeballList = (
        <div className="catch-menu">
          <div className="exit" onClick={this.closeMenus}>X</div>
          {this.context.items.map(item =>
            <PokeballListItem
              key={this.context.items.indexOf(item)}
              item={item}
              throwBall={this.throwBall}/>)}
        </div>
      );
    }
    if (this.state.itemMenu) {
      pokeballList = (
        <div className="catch-menu">
          <div className="exit" onClick={this.closeMenus}>X</div>
          {this.context.items.map(item =>
            <BerryListItem
              key={this.context.items.indexOf(item)}
              item={item}
              useBerry={this.useBerry} />
          )}
        </div>
      );
    }
    return (
      <>
        <div className="pokedex-body">
          <div className="pokedex-screen-container">
            <div className="pokedex-display-screen" style={{ backgroundImage: `url(assets/images/${this.context.timeOfDay}-bg-sm.gif)` }}>
              <div className="top-screen-first-row">
                <div className="top-screen-title to-uppercase">
                  {wildPokemon.name}
                </div>
              </div>
              <div className="top-screen-second-row">
                <div className="pokemon-encounter" style={{ backgroundImage: `url(${wildPokemon.spriteFrontDefault})` }} />
              </div>
            </div>
          </div>
          <div className="pokedex-screen-container">
            <div className="pokedex-rectangle-screen" id="rectangle-screen">
              <div className="encounter-actions">
                <div
                  className="encounter-button use-catch"
                  onClick={() => {
                    this.toggleMenu();
                    this.context.getItems();
                  }}>
                POKéBALLS
                </div>
                {pokeballList}
                <div
                  className="encounter-button use-item"
                  onClick={() => {
                    this.toggleItemMenu();
                    this.context.getItems();
                  }}>
                BERRIES
                </div>
                <div
                  className="encounter-button use-run"
                  onClick={() => {
                    this.context.toggleEncounterModal();
                    this.context.setEncounterType('approve-run');
                  }}>
                RUN
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Encounter.contextType = AppContext;
