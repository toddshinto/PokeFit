import React from 'react';

export default class BerryUsedModal extends React.Component {
  constructor(props) {
    super(props);
    this.randomIndex = Math.floor(Math.random() * 5);
  }

  render() {
    const message = [
      'feels content...',
      'looks full',
      'is gaining some weight',
      'has an incredible appetite',
      'wants some more...',
      'says mmm'
    ];

    return (
      <div className="modal-container" onClick={() => this.props.toggleEncounterModal()}>
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title" style={{ backgroundColor: '#4BB543' }}>BERRY GIVEN TO POKéMON!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.props.pokemon.name} ${message[this.randomIndex]}`}</div>
          <div className="item-modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div className="answer modal-button">CONTINUE</div>
          </div>
        </div>
      </div>
    );
  }
}
