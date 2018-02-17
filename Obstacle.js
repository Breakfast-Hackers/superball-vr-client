import React from 'react';
import { Sphere, Animated, Easing } from 'react-vr';

class Obstacle extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     positionY: new Animated.Value(1.5)
  //   };
  // }

  componentDidMount() {

    // let duration = this.props.speed * 5000;
    //
    // Animated.timing(
    //   this.state.positionY,
    //   {
    //     toValue: -1.5,
    //     duration: duration,
    //     isInteraction: false
    //   }
    // ).start();
  }

  render() {
    return (<Animated.View style={{ transform: [{ translate: [ this.props.positionX, this.props.positionY, -3] }]}}>
       <Sphere
        radius={0.05}
        widthSegments={20}
        heightSegments={12}
        style={{
          color: this.props.color
        }}
      />
    </Animated.View>);
  }
}

module.exports = Obstacle;
