import React from 'react';

export default class ItemModal extends React.Component {
  render() {
    let s = '';
    if (this.props.item.quantity > 1) { s = 's'; }
    return (
      <div className="modal-container">
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div
          className="modal-title to-uppercase"
          style={{ backgroundColor: 'yellow' }}>{`You found ${this.props.item.quantity} ${this.props.item.name}${s}!`}</div>
        <div className="modal-body">
          <div className="item-modal-image-container" style={{ backgroundImage: `url(${this.props.item.sprite})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.props.takeItem();
              this.props.setEncounterType('took-item');
            }} className="answer modal-button">TAKE</div>
            <div onClick={() => {
              this.props.setEncounterType('left-item');
            }} className="answer modal-button">LEAVE</div>
          </div>
        </div>
      </div>
    );
  }
}
