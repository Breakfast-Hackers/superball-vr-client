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

import Board from './Board.js';
import Ball from './Ball.js';
import Obstacle from './Obstacle.js';
import DebugControls from './DebugControls.js';

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
      ballPosition: new Animated.Value(0),
      obstacles: []
    }

    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);

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

       client.subscribe('/topic/obstacles', message => {
         let command = JSON.parse(message.body);
         let obstacle = { positionX: command.position * 0.45, speed: 0.5, color: command.color };
         var currentObstacles = this.state.obstacles;
         currentObstacles.push(obstacle);
         this.setState({ obstacles: currentObstacles });
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

  // componentDidMount() {
  //   setTimeout(() => this.tick(), 10);
  // }
  //
  // tick() {
  //
  //
  //
  //   setTimeout(() => this.tick(), 10);
  // }

  render() {

    let obstacles = this.state.obstacles.map((model, index) => {
      return <Obstacle key={"Obstacle-" + index} positionX={model.positionX} speed={model.speed} color={model.color} />
    });

    return (
      <Animated.View>
        <Pano source={asset('chess-world.jpg')} />
        <Board />
        <Ball position={this.state.ballPosition} />
        {obstacles}
      </Animated.View>
    );
  }
};

// <DebugControls onLeft={this.goLeft} onRight={this.goRight} />

AppRegistry.registerComponent('HelloVRWorld', () => HelloVRWorld);
