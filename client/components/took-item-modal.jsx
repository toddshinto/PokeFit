import React from 'react';

export default class TookItemModal extends React.Component {
  render() {
    let s = '';
    if (this.props.item.quantity > 1) { s = 's'; }
    return (
      <div className="modal-container">
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title" style={{ backgroundColor: '#4BB543', color: 'white' }}>ITEM ADDED TO BACKPACK!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase" style={{ marginTop: '10px' }}>{`${this.props.item.quantity} ${this.props.item.name}${s}`}</div>
          <div className="item-modal-image-container" style={{ backgroundImage: `url(${this.props.item.sprite})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.props.resetState();
              this.props.getItems();
              this.props.toggleEncounterModal();
            }} className="answer modal-button" style={{ backgroundColor: '#4BB543', color: 'white' }}>CONTINUE</div>
          </div>
        </div>
      </div>
    );
  }
}
