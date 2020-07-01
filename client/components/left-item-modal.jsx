import React from 'react';

<<<<<<< HEAD
export default class CaptureFailModal extends React.Component {
  constructor(props) {
    super(props);
    this.randomIndex = Math.floor(Math.random() * 5);
  }

  render() {
    const message = [
      '...laughs at you?',
      'looks antsy.',
      'is waiting for you',
      'is not hot dog',
      'wants to be the very best'
    ];
    return (
      <div className="modal-container" onClick={() => this.props.toggleEncounterModal()}>
=======
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
>>>>>>> 3928358af7b6512002e450df68e012da2fd73e94
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
<<<<<<< HEAD
        <div className="modal-title" style={{ backgroundColor: 'red' }}>`YOU LEFT THE ${this.props.ITEM.name}`</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.props.pokemon.name} ${message[this.randomIndex]}`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.sprite_front_default})` }} />
          <div className="modal-button-container">
            <div className="answer modal-button">TRY AGAIN</div>
=======
        <div className="modal-title to-uppercase" style={{ backgroundColor: 'red' }}>{`YOU LEFT ${this.props.item.quantity} ${this.props.item.name}${s}`}</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{this.props.item.name}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.item.sprite})` }} />
          <div className="modal-button-container">
            <div className="answer modal-button">CONTINUE</div>
>>>>>>> 3928358af7b6512002e450df68e012da2fd73e94
          </div>
        </div>
      </div>
    );
  }
}
