import React from 'react';

export default class itemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDetails: 'stats'
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({
      viewDetails: view
    });
  }

  render() {
    const item = this.props.item;
    let details;
    if (item) {
      details = (
        <div onClick={() => this.changeView('description')}>
          <div>{item.name}</div>
          <div>Type: {item.type}</div>
          <div>Height: {item.description}</div>
          <div>Weight: {item.effect}</div>
        </div>
      );
      return (
        <div>
          <div>{item.name}</div>
          {details}
        </div>
      );
    } else {
      return (
        <div>0</div>
      );
    }
  }
}
