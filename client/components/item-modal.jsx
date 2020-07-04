import React from 'react';
import { AppContext } from './app-context';

export default class ItemModal extends React.Component {
  render() {
    let s = '';
    if (this.context.foundItem.quantity > 1) { s = 's'; }
    return (
      <div className="modal-container">
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div
          className="modal-title to-uppercase"
          style={{ backgroundColor: 'yellow' }}>{`You found ${this.context.foundItem.quantity} ${this.context.foundItem.name}${s}!`}</div>
        <div className="modal-body">
          <div className="item-modal-image-container" style={{ backgroundImage: `url(${this.context.foundItem.sprite})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.context.takeItem();
              this.context.setEncounterType('took-item');
            }} className="answer modal-button green-bg">TAKE</div>
            <div onClick={() => {
              this.context.setEncounterType('left-item');
            }} className="answer modal-button red-bg">LEAVE</div>
          </div>
        </div>
      </div>
    );
  }
}

ItemModal.contextType = AppContext;
