import React from 'react';

export default class CaptureFailModal extends React.Component {
  constructor(props) {
    super(props);
    this.randomIndex = Math.floor(Math.random() * 17);
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
      'says too bad you don\'t have a master ball',
      'rolls eyes'
    ];
    return (
      <div className="modal-container" onClick={() => this.props.toggleEncounterModal()}>
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title" style={{ backgroundColor: 'red' }}>OH NO! THE POKéMON BROKE FREE!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.props.pokemon.name} ${message[this.randomIndex]}`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div className="answer modal-button">TRY AGAIN</div>
          </div>
        </div>
      </div>
    );
  }
}
