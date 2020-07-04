import React from 'react';
import { AppContext } from './app-context';

export default class ApproveRun extends React.Component {
  constructor(props) {
    super(props);
    this.handleYes = this.handleYes.bind(this);
  }

  handleYes() {
    this.context.toggleEncounterModal();
    this.context.resetState();
  }

  render() {
    return (
      <div className="modal-container" >
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title red-bg">ARE YOU SURE YOU WANT TO RUN?</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{this.context.wildPokemon.name}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.context.wildPokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.context.view === 'encounter'
                ? this.context.setView('walk')
                : this.handleYes();
            }} className="answer modal-button green-bg">YES</div>
            <div onClick={() => {
              this.context.view === 'encounter'
                ? this.context.toggleEncounterModal()
                : this.context.setEncounterType('pokemon');
            }} className="answer modal-button red-bg">NO</div>
          </div>
        </div>
      </div>
    );
  }
}

ApproveRun.contextType = AppContext;
