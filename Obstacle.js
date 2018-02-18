import React from 'react';
import { Easing } from 'react-native';
import { Sphere, Animated, asset } from 'react-vr';

class Obstacle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rotationAngle: new Animated.Value(0)
    };
  }

  render() {

    if (this.props.animate && this.animation == null) {
      var animation = Animated.timing(this.state.rotationAngle, {
        toValue: 360 * 1000,
        duration: 400 * 1000,
        easing: Easing.linear
      })
      this.animation = animation;
      animation.start()
    } else if (!this.props.animate && this.animation != null) {
      this.animation.stop();
      this.animation = null;
    }

    return (<Animated.View style={{ transform: [{ translate: [ this.props.positionX, this.props.positionY, -3] }, { rotateX: this.state.rotationAngle.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })}]}}>
       <Sphere
        radius={this.props.radius}
        widthSegments={32}
        heightSegments={32}
        lit={true}
        texture={{...asset('obstacle.png')}}
        style={{
          color: this.props.color
        }}
      />
    </Animated.View>);
  }
}

module.exports = Obstacle;
