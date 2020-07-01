import React from 'react';

export default class CaptureSuccessModal extends React.Component {
  constructor(props) {
    super(props);
    this.randomIndex = Math.floor(Math.random() * 5);
  }

  render() {
    const message = [
      '...laughs at you?',
      'looks antsy.',
      'is waiting for you',
      'is not hot dog',
      'wants to be the very best'
    ];
    return (
      <div className="modal-container" onClick={() => this.props.toggleEncounterModal()}>
        <div className="modal-title" style={{ backgroundColor: 'red' }}>OH NO! THE POKéMON BROKE FREE!</div>
        <div className="modal-body">
          <div className="modal-body-title to-capitalize">{`${this.props.pokemon.name} ${message[this.randomIndex]}`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.sprite_front_default})` }} />
          <div className="modal-button-container">
            <div className="answer modal-button">TRY AGAIN</div>
          </div>
        </div>
      </div>
    );
  }
}
