import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    let footer = (
      <div className="pokedex-footer">
        <div onClick={() => this.handleClick()} className="encounter-footer-container">
          <div className="encounter-footer-button" />
        </div>
      </div>
    );
    if (this.state.isClicked) {
      footer = (
        <div className="pokedex-footer" onClick={() => { this.handleClick(); this.props.resetState(); }}>
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
    }
    return (
      footer
    );
  }
}
