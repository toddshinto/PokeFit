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
        <div className='pokemon-desc'>
          <div>short Desc: {item.shortDesc}</div>
          <div>Quantity: {item.quantity}</div>
        </div>
      );
      return (
        <div className="item-display-screen" style={{ backgroundImage: `url(${this.props.backgroundImage})` }} >
          <div className="pokemon-name">{item.name}</div>
          <div className="item-second-row">
            <div className="item-picture" style={{ backgroundImage: `url(${item.sprite})` }}></div>
            {details}
          </div>
        </div>
      );
    } else {
      return (
        <div className="pokemon-screen-container">
          <div className="pokemon-display-screen" style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
            <div className="display-header" style={{ backgroundColor: 'yellow' }}>Go find some ITEMS!</div>
          </div>
        </div>
      );
    }
  }
}
