import React from 'react';

export default class PokemonModal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <div className="modal-title" style={{ backgroundColor: 'yellow' }}>A WILD POKEMON APPEARED!</div>
        <div className="modal-body">
          <div className="modal-body-title to-capitalize">{this.props.pokemon.name}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.sprite_front_default})` }}/>
          <div className="modal-button-container">
            <div onClick={() => {
              this.props.setView('encounter');
              this.props.toggleEncounterModal();
            }} className="answer modal-button">FIGHT</div>
            <div onClick={() => {
              this.props.resetState();
            }} className="answer modal-button">RUN</div>
          </div>
        </div>
      </div>
    );
  }
}
