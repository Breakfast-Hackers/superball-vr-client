import React from 'react';
import { View, Plane } from 'react-vr';

class Board extends React.Component {

  render() {
    return <Plane
      dimWidth={1}
      dimHeight={3}
      style={{
        color: '#FF0',
        transform: [{translate: [0, 0, -3]}]
      }}
    />
  }

}

module.exports = Board;
