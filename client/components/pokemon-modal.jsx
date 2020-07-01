import React from 'react';

export default class PokemonModal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <div className="modal-title">A WILD POKEMON APPEARED</div>
        <div className="modal-image-container">
          <img src={this.props.pokemon.sprite_front_default} alt={this.props.pokemon.name} />
        </div>
        <div className="button-container">
          <button onClick={() => {
            this.props.setEncounterModalOff();
            this.props.setView('encounter');
          }} className="modal-button">FIGHT</button>
          <button onClick={() => {
            this.props.setEncounterModalOff();
            this.props.setView(this.props.view);
          }} className="modal-button">RUN</button>
        </div>
      </div>
    );
  }
}
