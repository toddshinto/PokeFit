import React from 'react';

export default class EncounterModal extends React.Component {
  render() {
    const quantity = Math.floor(Math.random() * 5) + 1;
    return (
      <div className="modal-container">
        <div className="modal-title">you found {quantity}{' '}{this.props.item.name} !!!</div>
        <div className="modal-image-container">
          <img src={this.props.item.sprite} alt={this.props.item.name}/>
        </div>
        <button onClick={() => {
          this.props.setView('backpack');
          this.props.setEncounterModal();
        }} className="modal-button">TAKE</button>
        <button onClick={() => {
          this.props.setView(this.props.view);
          this.props.setEncounterModal();
        }} className="modal-button">LEAVE</button>
      </div>
    );
  }
}
