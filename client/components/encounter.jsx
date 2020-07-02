import React from 'react';
import PokeballListItem from './pokeball-list-item';
import BerryListItem from './berry-list-item';

export default class Encounter extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.attemptCatch(ball);
  }

  useBerry(berry) {
    this.toggleItemMenu();
    this.props.attemptBerry(berry);
  }

  render() {
    const wildPokemon = this.props.wildPokemon;
    let pokeballList;
    if (this.state.catchMenu) {
      pokeballList = (
        <div className="catch-menu">
          <div className="exit" onClick={this.closeMenus}>X</div>
          {this.props.items.map(item =>
            <PokeballListItem
              key={this.props.items.indexOf(item)}
              item={item}
              throwBall={this.throwBall}/>)}
        </div>
      );
    }
    if (this.state.itemMenu) {
      pokeballList = (
        <div className="catch-menu">
          <div className="exit" onClick={this.closeMenus}>X</div>
          {this.props.items.map(item =>
            <BerryListItem
              key={this.props.items.indexOf(item)}
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
            <div className="pokedex-display-screen" style={{ backgroundImage: `url(assets/images/${this.props.timeOfDay}-bg.gif)` }}>
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
                  className="encounter-button"
                  onClick={() => {
                    this.toggleMenu();
                    this.props.getItems();
                  }}>
                CATCH
                </div>
                {pokeballList}
                <div
                  className="encounter-button"
                  onClick={() => {
                    this.toggleItemMenu();
                    this.props.getItems();
                  }}>
                ITEMS
                </div>
                <div
                  className="encounter-button"
                  onClick={ () => {
                    this.props.setView('walk');
                    this.props.resetState();
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
