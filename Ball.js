import React from 'react';
import { Animated, View, Sphere } from 'react-vr';

class Ball extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return <Animated.View
      style={{
        transform: [{ translate: [ 0, 0, -2.9] }, { translateX: this.props.position }]
      }} >

      <Sphere
        radius={0.05}
        widthSegments={20}
        heightSegments={12}
        style={{
          color: '#F00'
        }}
      />

    </Animated.View>
  }
}

module.exports = Ball;
