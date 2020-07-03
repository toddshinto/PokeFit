import React from 'react';

export default class ApproveRun extends React.Component {
  constructor(props) {
    super(props);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  handleYes(e) {
    e.stopPropagation();
    this.props.setView('walk');
    this.props.toggleEncounterModal();
    this.props.resetState();
  }

  handleNo(e) {
    this.props.view === 'encounter'
      ? this.props.toggleEncounterModal()
      : this.props.setEncounterType('pokemon');
  }

  render() {
    return (
      <div className="modal-container" >
        <div className="pokeball-icon top-right"></div>
        <div className="pokeball-icon top-left"></div>
        <div className="pokeball-icon bottom-right"></div>
        <div className="pokeball-icon bottom-left"></div>
        <div className="modal-title red-bg">ARE YOU SURE YOU WANT TO RUN?</div>
        <div className="modal-body">
          <div className="modal-body-title to-uppercase">{`${this.props.pokemon.name}`}</div>
          <div className="modal-image-container" style={{ backgroundImage: `url(${this.props.pokemon.spriteFrontDefault})` }} />
          <div className="modal-button-container">
            <div onClick={this.handleYes} className="answer modal-button green-bg">YES</div>
            <div onClick={this.handleNo} className="answer modal-button red-bg">NO</div>
          </div>
        </div>
      </div>
    );
  }
}
