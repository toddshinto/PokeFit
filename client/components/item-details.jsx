import React from 'react';
import { AppContext } from './app-context';

export default class ItemDetails extends React.Component {
  render() {
    const item = this.context.itemDetails;
    let details;
    if (item) {
      details = (
        <div className='pokemon-desc'>
          <div style={{ marginTop: '15px' }}>{item.longDesc}</div>
          <div>Quantity: {item.quantity}</div>
        </div>
      );
      return (
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(/assets/images/${this.context.timeOfDay}-bg-sm.gif)` }} >
            <div className="top-screen-first-row">
              <div className="top-screen-title to-uppercase">{item.name}</div>
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
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(${this.context.timeOfDay}-bg-sm.gif)` }}>
            <div className="top-display-header" style={{ backgroundColor: 'yellow' }}>GO FIND SOME ITEMS!</div>
          </div>
        </div>
      );
    }
  }
}

ItemDetails.contextType = AppContext;
