import React from 'react';

export default class Footer extends React.Component {
  render() {
    let button1;
    let button2;
    switch (this.props.view) {
      case 'pokebox' :
        button1 = 'backpack';
        button2 = 'walk';
        break;
      case 'walk' :
        button1 = 'backpack';
        button2 = 'pokebox';
        break;
      case 'backpack' :
        button1 = 'pokebox';
        button2 = 'walk';
    }
    return (
      <div className="pokebox-footer">
        <div className={`${button1}-button-container`} onClick={() => this.props.setView(button1)}>
          <div className={`${button1}-button-icon button-icon`} />
        </div>
        <div className={`${button2}-button-container`} onClick={() => this.props.setView(button2)}>
          <div className={`${button2}-button-icon button-icon`} />
        </div>
      </div>
    );
  }
}
