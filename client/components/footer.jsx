import React from 'react';
import { AppContext } from './app-context';

export default class Footer extends React.Component {
  constructor(context) {
    super(context);
    this.state = {
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    let footer = (
      <div className="pokedex-footer">
        <div onClick={e => this.handleClick(e)} className="encounter-footer-container">
          <div className="encounter-footer-button" />
        </div>
      </div>
    );
    if (this.state.isClicked) {
      footer = (
        <div className="pokedex-footer" onClick={e => { this.handleClick(e); this.context.resetState(); }}>
          <div className={'pokebox-button-container'} onClick={() => this.context.setView('pokebox')}>
            <div className={'pokebox-button-icon button-icon'} />
          </div>
          <div className={'backpack-button-container'} onClick={() => this.context.setView('backpack')}>
            <div className={'backpack-button-icon button-icon'} />
          </div>
          <div className={'walk-button-container'} onClick={() => this.context.setView('walk')}>
            <div className={'walk-button-icon button-icon'} />
          </div>
          <div className={'close-buttons'} onClick={e => this.handleClick(e)} />
        </div>
      );
    }
    if (this.context.encounterType && this.context.encounterModal === true) {
      footer = <div className="pokedex-footer">
        <div className="encounter-footer-container">
          <div className="encounter-footer-button" />
        </div>
      </div>;
    }
    return (
      footer
    );
  }
}

Footer.contextType = AppContext;
