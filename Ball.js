import React from 'react';
import { Animated, View, Sphere } from 'react-vr';

class Ball extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return <Animated.View
      style={{
        transform: [{ translate: [ this.props.position, 0, -2.9] }]
      }} >

      <Sphere
        radius={0.05}
        widthSegments={20}
        heightSegments={12}
        style={{
          color: '#000'
        }}
      />

    </Animated.View>
  }
}

module.exports = Ball;
