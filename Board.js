import React from 'react';
import { Text, View, Plane, Image, asset } from 'react-vr';

class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  // <Image
  //     source={require('./static_assets/board.png')}
  //     style={{
  //       transform: [{ translate: [0, 0, -3] }]
  //     }}
  //   />

  render() {
    return (<View>

      <Plane
        dimWidth={1}
        dimHeight={30}
        texture={{...asset('board.png'), repeat: [1, 20] }}
        style={{
          color: '#FFF',
          transform: [{ translate: [0, 0 + this.props.offset, -3] }]
        }}
      />
    </View>
    );

  }

}

module.exports = Board;
