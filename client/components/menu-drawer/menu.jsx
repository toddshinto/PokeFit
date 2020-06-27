import React from 'react';
import MenuAction from './MenuAction';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null
    };
  }

  render() {
    return (
      <>
        <div>
        Menu
        </div>
        <MenuAction action={this.state.action}/>
      </>
    );
  }
}
