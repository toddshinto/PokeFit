import React from 'react';

export default class BerryListItem extends React.Component {
  render() {
    const item = this.props.item;
    if (item.type === 'ball') {
      return <></>;
    } else {
      return (
        <div
          className="pokeball-list-item list-item to-capitalize"
          onClick={() => this.props.useBerry(item)}>
          <div
            className="pokeball-list-item-image"
            style={{ backgroundImage: `url(${item.sprite})` }} />
          <div>{item.name}</div>
        </div>
      );
    }
  }
}
