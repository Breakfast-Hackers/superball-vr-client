import React from 'react';
import { Animated, View, Sphere, asset } from 'react-vr';

class Ball extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rotationAngle: new Animated.Value(0)
    };
  }

  componentDidMount() {
    if (!this.props.animate) {
      return;
    }

    Animated.timing(this.state.rotationAngle, {
      toValue: -360 * 1000,
      duration: 400 * 1000
    }).start();
  }

  render() {
    return <Animated.View
      style={{
        transform: [{ translate: [ this.props.position, 0, -2.9] }, { rotateX: this.state.rotationAngle.interpolate({
                  inputRange: [0, -360],
                  outputRange: ['0deg', '360deg']
                })}]
      }} >

      <Sphere
        radius={0.05}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        texture={{...asset('ball.png')}}
        style={{
          color: '#FF0'
        }}
      />

    </Animated.View>
  }
}

module.exports = Ball;
