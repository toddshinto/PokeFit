import React from 'react';
import { AppContext } from './app-context';

export default class PokemonModal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title" style={{ backgroundColor: 'yellow' }}>A WILD POKEMON APPEARED!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{this.context.wildPokemon.name}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.context.wildPokemon.spriteFrontDefault})` }}/>
          <div className="modal-button-container">
            <div onClick={() => {
              this.context.setView('encounter');
              this.context.toggleEncounterModal();
            }} className="answer answer-true modal-button green-bg">FIGHT</div>
            <div onClick={() => {
              this.context.setEncounterType('approve-run');
            }} className="answer answer-false modal-button red-bg">RUN</div>
          </div>
        </div>
      </div>
    );
  }
}

PokemonModal.contextType = AppContext;
