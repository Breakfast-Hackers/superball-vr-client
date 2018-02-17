import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box,
  Plane,
  Sphere,
  Animated,
  VrButton
} from 'react-vr';
//import Board from './Board.js';

const webSocket = new window.WebSocket('wss://superball.herokuapp.com/superball-websocket');

webSocket.onopen = () => {
  console.log('websocket opened');
};

webSocket.onmessage = event => {
  console.log('received event: ' + event);
};

webSocket.onerror = error => {
  console.log('error received on socket: ' + error.message);
};

webSocket.onclose = event => {
  console.log('websocket closed');
};

export default class HelloVRWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ballPosition: new Animated.Value(0)
    }

    this.goLeft = this.goLeft.bind(this);
  }

  goLeft() {
    Animated.timing(
      this.state.ballPosition,
      {
        toValue: -0.45,
        duration: 400
      }
    ).start();
  }

  goRight() {
    Animated.timing(
      this.state.ballPosition,
      {
        toValue: 0.45,
        duration: 400
      }
    ).start();
  }

  render() {
    console.log('ballPosition: ' + this.state.ballPosition);

    return (
      <Animated.View>
        <Pano source={asset('chess-world.jpg')} />
        <Text style={{
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}]
         }}>Foo</Text>
         <Plane
            dimWidth={1}
            dimHeight={4}
            style={{
              color: '#FF0',
              transform: [{translate: [0, 0, -2]}]
            }}
          />

        <Animated.View
          style={{
            transform: [{ translate: [0, 0, -1.9] }, { translateX: this.state.ballPosition }]
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



          <VrButton onClick={() => this.goLeft() } ><Text style={{
            fontSize: 0.1,
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -1.5]}]
          }} onInput={() => {}}>
          Go Left
          </Text></VrButton>

          <VrButton onClick={() => this.goRight() } ><Text style={{
            fontSize: 0.1,
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -1.5]}]
          }} onInput={() => {}}>
          Go Right
          </Text></VrButton>

      </Animated.View>
    );
  }
};

// , -1.9

AppRegistry.registerComponent('HelloVRWorld', () => HelloVRWorld);
