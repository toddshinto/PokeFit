import React from 'react';

export default class AproveRun extends React.Component {

  render() {
    return (
      <div className="modal-container" >
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title" style={{ backgroundColor: 'red' }}>ARE YOU SURE YOU WANT TO RUN </div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.props.pokemon.name}`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.props.setView('walk');
              this.props.resetState();
              this.props.toggleEncounterModal();
            }} className="answer modal-button">YES</div>
            <div onClick={() => {
              this.props.setEncounterType('pokemon');
            }} className="answer modal-button">NO</div>
          </div>
        </div>
      </div>
    );
  }
}
