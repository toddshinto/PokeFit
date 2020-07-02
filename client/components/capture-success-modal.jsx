import React from 'react';

export default class CaptureSuccessModal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title" style={{ backgroundColor: '#4BB543' }}>CONGRATULATIONS!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.props.pokemon.name} HAS BEEN CAUGHT!`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.props.setView('pokebox');
              this.props.toggleEncounterModal();
              this.props.setCaughtDetails(this.props.pokemon);
              this.props.getPokemon();
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
