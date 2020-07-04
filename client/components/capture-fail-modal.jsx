import React from 'react';
import { AppContext } from './app-context';

export default class CaptureFailModal extends React.Component {
  constructor(props) {
    super(props);
    this.randomIndex = Math.floor(Math.random() * 19);
  }

  render() {
    const message = [
      '...laughs at you!',
      'looks antsy',
      'is waiting for you',
      'is not hot dog',
      'wants to be the very best',
      'is gone without a trace',
      'says better luck next time kiddo',
      'says smell ya later',
      'says is that the best you can do?',
      'says you\'re killing me smalls',
      'says sashay away',
      'is so over you',
      'was the one that got away',
      'says my grandma throws better than you',
      'cackles maniacally',
      'says too bad you don\t have a master ball',
      'rolls eyes',
      'no really throw it',
      'you are adopted your parents dont love you',
      'you cant be serious',
      'go on ill wait',
      'says too bad you don\'t have a master ball',
      'rolls eyes'
    ];
    return (
      <div className="modal-container" onClick={() => this.context.toggleEncounterModal()}>
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title red-bg">OH NO! THE POKéMON BROKE FREE!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.context.wildPokemon.name} ${message[this.randomIndex]}`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.context.wildPokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div className="answer modal-button green-bg">TRY AGAIN</div>
          </div>
        </div>
      </div>
    );
  }
}

CaptureFailModal.contextType = AppContext;
