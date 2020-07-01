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
        <div className="modal-title" style={{ backgroundColor: '#4BB543' }}>CONGRATULATIONS!</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.props.item.quantity} ${this.props.item.name}${s} ADDED TO BACKPACK!`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.item.sprite})` }} />
          <div className="modal-button-container">
            <div onClick={() => {
              this.props.toggleEncounterModal();
              this.props.setView('backpack');
              this.props.resetState();
            }} className="answer modal-button">VIEW BACKPACK </div>
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
