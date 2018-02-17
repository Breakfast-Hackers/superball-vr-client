import React from 'react';
import { Text, View, Plane } from 'react-vr';

class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<View>
      <Plane
        dimWidth={1}
        dimHeight={3}
        style={{
          color: '#FF0',
          transform: [{ translate: [0, 0, -3] }]
        }}
      />
    </View>
    );

  }

}

module.exports = Board;
