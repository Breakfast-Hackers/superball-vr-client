import React from 'react';
import { Text, View, Plane } from 'react-vr';

class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("rendering board" + this.props.time);
    return (<View>
      <Plane
        dimWidth={1}
        dimHeight={3}
        style={{
          color: '#FF0',
          transform: [{ translate: [0, 0, -3] }]
        }}
      />
      <Text style={{
        fontSize: 0.1,
        textAlignVertical: 'center',
        transform: [{ translate: [0, 1.5, -3] }]
      }} >
        {this.props.time}
      </Text></View>
    );

  }

}

module.exports = Board;
