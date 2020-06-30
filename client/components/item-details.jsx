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
          <div>{item.shortDesc}</div>
          <div>Quantity: {item.quantity}</div>
        </div>
      );
      return (
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(${this.props.backgroundImage})` }} >
            <div className="top-screen-first-row">
              <div className="top-screen-title to-capitalize">{item.name}</div>
            </div>
            <div className="top-screen-second-row">
              <div className="top-screen-picture">
                <div className="item-picture" style={{ backgroundImage: `url(${item.sprite})` }} />
              </div>
              {details}
            </div>
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
