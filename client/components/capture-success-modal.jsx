import React from 'react';
import { AppContext } from './app-context';

export default class CaptureSuccessModal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title green-bg">CONGRATULATIONS!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase" >{`${this.context.wildPokemon.name} HAS BEEN CAUGHT!`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.context.wildPokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.context.setView('pokebox');
              this.context.toggleEncounterModal();
              this.context.setCaughtDetails(this.context.wildPokemon);
              this.context.getPokemon();
            }} className="answer modal-button green-bg">POKéBOX</div>
            <div onClick={() => {
              this.context.setView('walk');
              this.context.resetState();
              this.context.toggleEncounterModal();
            }} className="answer modal-button green-bg">WALK</div>
          </div>
        </div>
      </div>
    );
  }
}

CaptureSuccessModal.contextType = AppContext;
