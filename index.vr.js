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

const Stomp = require('stompjs/lib/stomp.js').Stomp;

const client = Stomp.client('wss://superball.herokuapp.com/superball-websocket/websocket');

// const webSocket = new window.WebSocket('wss://superball.herokuapp.com/superball-websocket/websocket');
//
// webSocket.onopen = () => {
//   console.log('websocket opened');
// };
//
// webSocket.onmessage = event => {
//   console.log('received event: ' + event);
// };
//
// webSocket.onerror = error => {
//   console.log('error received on socket: ' + error.message);
// };
//
// webSocket.onclose = event => {
//   console.log('websocket closed');
// };

export default class HelloVRWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ballPosition: new Animated.Value(0)
    }

    this.goLeft = this.goLeft.bind(this);

    let self = this;

    client.connect({}, frame => {
      console.log('connected: ' + frame);

      client.subscribe('/topic/movements', function (message) {
    	   const movement = JSON.parse(message.body);
         console.log('movement: ' + movement.action);

         switch (movement.action) {
           case 'links':
            self.goLeft();
            break;
            case 'rechts':
            self.goRight();
            break;
         }


       });

      client.subscribe('/topic/commands', function (message) {
    	   const command = JSON.parse(message.body)
         console.log('command: ' + command.action);
       });
    });

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
    return (
      <Animated.View>
        <Pano source={asset('chess-world.jpg')} />

         <Plane
            dimWidth={1}
            dimHeight={3}
            style={{
              color: '#FF0',
              transform: [{translate: [0, 0, -3]}]
            }}
          />

          <Sphere
            radius={0.05}
            widthSegments={20}
            heightSegments={12}
            style={{
              color: '#00F',
              transform: [{ translate: [ 0, 1, -3] }]
            }}
          />

        <Animated.View
          style={{
            transform: [{ translate: [ 0, 0, -2.9] }, { translateX: this.state.ballPosition }]
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
