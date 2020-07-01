import React from 'react';

export default class LeftItemModal extends React.Component {
  render() {
    let s = '';
    if (this.props.item.quantity > 1) { s = 's'; }
    return (
      <div className="modal-container"
        onClick={() => {
          this.props.toggleEncounterModal();
          this.props.resetState();
        }}>
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title to-uppercase" style={{ backgroundColor: 'red' }}>{`YOU LEFT ${this.props.item.quantity} ${this.props.item.name}${s}`}</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{this.props.item.name}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.item.sprite})` }} />
          <div className="modal-button-container">
            <div className="answer modal-button">CONTINUE</div>
          </div>
        </div>
      </div>
    );
  }
}
