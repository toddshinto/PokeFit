import React from 'react';
import { AppContext } from './app-context';

export default class TookItemModal extends React.Component {
  render() {
    let s = '';
    if (this.context.foundItem.quantity > 1) { s = 's'; }
    return (
      <div className="modal-container">
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title green-bg">ITEM ADDED TO BACKPACK!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase" style={{ marginTop: '10px' }}>{`${this.context.foundItem.quantity} ${this.context.foundItem.name}${s}`}</div>
          <div className="item-modal-image-container" style={{ backgroundImage: `url(${this.context.foundItem.sprite})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.context.resetState();
              this.context.getItems();
              this.context.toggleEncounterModal();
            }} className="answer modal-button green-bg">CONTINUE</div>
          </div>
        </div>
      </div>
    );
  }
}

TookItemModal.contextType = AppContext;
