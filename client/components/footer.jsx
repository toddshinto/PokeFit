import React from 'react';

export default class Footer extends React.Component {
  render() {
  
    let footer = (
      <div className="pokedex-footer">
        <div className={'pokebox-button-container'} onClick={() => this.props.setView('pokebox')}>
          <div className={'pokebox-button-icon button-icon'} />
        </div>
        <div className={'backpack-button-container'} onClick={() => this.props.setView('backpack')}>
          <div className={'backpack-button-icon button-icon'} />
        </div>
        <div className={'walk-button-container'} onClick={() => this.props.setView('walk')}>
          <div className={'walk-button-icon button-icon'} />
        </div>
      </div>
    );
    if (this.props.view === 'encounter') {
      footer = (
        <div className="pokedex-footer">
          <div className="encounter-footer-container">
            <div className="encounter-footer-button" />
          </div>
        </div>
      );
    }
    return (
      footer
    );
  }
}
