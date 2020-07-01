import React from 'react';

export default class CaptureSuccessModal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <div className="modal-title" style={{ backgroundColor: '#4BB543' }}>CONGRATULATIONS!</div>
        <div className="modal-body">
          <div className="modal-body-title to-capitalize">{`${this.props.pokemon.name} HAS BEEN CAUGHT!`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.sprite_front_default})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.props.setView('pokebox');
              this.props.toggleEncounterModal();
              this.props.getPokemon();
              this.props.resetState();
            }} className="answer modal-button">VIEW BOX</div>
            <div onClick={() => {
              this.props.setView('walk');
              this.props.resetState();
              this.props.toggleEncounterModal();
            }} className="answer modal-button">WALK</div>
          </div>
        </div>
      </div>
    );
  }
}
