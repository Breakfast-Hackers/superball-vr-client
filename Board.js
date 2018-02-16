import { React, Animated, Image } from 'react';

class Board extends React.Component {

  render() {
    return <Animated.Image
      source={{ uri: 'board.png' }}
    />
  }

}

module.exports = Board;
