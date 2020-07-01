import React from 'react';

export default class Footer extends React.Component {
  render() {
    // let button1;
    // let button2;
    // const view = this.props.view;
    // switch (view) {
    //   case 'pokebox' :
    //     button1 = 'backpack';
    //     button2 = 'walk';
    //     break;
    //   case 'walk' :
    //     button1 = 'backpack';
    //     button2 = 'pokebox';
    //     break;
    //   case 'backpack' :
    //     button1 = 'pokebox';
    //     button2 = 'walk';
    // }
    // let footer = (
    //   <div className="pokedex-footer">
    //     <div className={`${button1}-button-container`} onClick={() => this.props.setView(button1)}>
    //       <div className={`${button1}-button-icon button-icon`} />
    //     </div>
    //     <div className={`${button2}-button-container`} onClick={() => this.props.setView(button2)}>
    //       <div className={`${button2}-button-icon button-icon`} />
    //     </div>
    //   </div>
    // );
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
