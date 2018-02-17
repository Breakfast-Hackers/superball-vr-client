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
import Timer from './Timer.js';
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
      boardOffset: 0,
      currentBallPosition: 0,
      targetBallPosition: 0,
      obstacles: [],
      isGameRunning: false,
      time: 0
    }

    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
    this.tick = this.tick.bind(this);

    let self = this;

    client.connect({}, frame => {
      console.log('connected: ' + frame);

      client.subscribe('/topic/movements', message => {
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

      client.subscribe('/topic/commands', message => {
        const command = JSON.parse(message.body)
        console.log('command: ' + command.action);

        if (command.action == 'start') {
          self.setState({ obstacles: [] })
          self.setState({ isGameRunning: true });
          self.tick();
        }
      });

      client.subscribe('/topic/obstacles', message => {

        if (!self.state.isGameRunning) {
          return;
        }

        let command = JSON.parse(message.body);
        let obstacle = { positionX: command.position * 0.45, positionY: 1.5, speed: 0.5, color: command.color };
        var currentObstacles = self.state.obstacles;
        currentObstacles.push(obstacle);
        self.setState({ obstacles: currentObstacles });

      });

      client.subscribe('/topic/duration', (message) => {
        const duration = JSON.parse(message.body)
        self.setState({ time: milisecondstoSeconds(duration.duration) });
      });
    });

  }

  goLeft() {
    if (!this.state.isGameRunning) {
      return;
    }

    this.setState({ targetBallPosition: -0.45 });
  }

  goRight() {
    if (!this.state.isGameRunning) {
      return;
    }


    this.setState({ targetBallPosition: 0.45 });
  }

  tick() {

    var boardOffset = this.state.boardOffset;
    var currentBallPosition = this.state.currentBallPosition;
    var targetBallPosition = this.state.targetBallPosition;

    boardOffset -= 0.001;

    if (targetBallPosition != null) {

      if (currentBallPosition > targetBallPosition) {
        currentBallPosition = Math.max(targetBallPosition, currentBallPosition - 0.02);
      } else if (currentBallPosition < targetBallPosition) {
        currentBallPosition = Math.min(targetBallPosition, currentBallPosition + 0.02);
      } else {
        targetBallPosition = null;
      }
    }

    var collisionDetected = false;

    let updatedObstacles = this.state.obstacles.map(obstacle => {
      let updatedPositionY = obstacle.positionY -= 0.01;

      if (updatedPositionY < -1.5) {
        return null;
      }

      let ballMinX = currentBallPosition - 0.075;
      let ballMaxX = currentBallPosition + 0.075;

      let ballMinY = -0.075;
      let ballMaxY = 0.075;

      if (obstacle.positionX >= ballMinX
        && obstacle.positionX <= ballMaxX
        && obstacle.positionY >= ballMinY
        && obstacle.positionY <= ballMaxY) {
        collisionDetected = true;
      }

      return { positionX: obstacle.positionX, positionY: updatedPositionY, speed: obstacle.speed, color: obstacle.color };
    }).filter(obstacle => obstacle != null);

    this.setState({ boardOffset: boardOffset, obstacles: updatedObstacles, currentBallPosition: currentBallPosition, targetBallPosition: targetBallPosition, isGameRunning: !collisionDetected });

    if (!collisionDetected) {
      setTimeout(() => this.tick(), 5);
    } else {
      console.log("oh, oh, you lost");
      gameOver();
    }
  }

  render() {

    let obstacles = this.state.obstacles.map((model, index) => {
      return <Obstacle key={"Obstacle-" + index} positionX={model.positionX} positionY={model.positionY} speed={model.speed} color={model.color} />
    });

    return (
      <Animated.View>
        <Pano source={asset('chess-world.jpg')} />
        <Board offset={this.state.boardOffset} />

        <Timer time={this.state.time} />
        <Ball position={this.state.currentBallPosition} />
        {obstacles}

        <DebugControls onLeft={this.goLeft} onRight={this.goRight} />
      </Animated.View>
    );
  }
};

function milisecondstoSeconds(miliseconds) {
  if ((miliseconds != undefined) && (miliseconds >= 0)) {
    var seconds = ((miliseconds % 60000) / 1000).toFixed(0);
    var minutes = Math.floor(miliseconds / 60000);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }
}
function gameOver() {
  var url = 'https://superball.herokuapp.com/api/game';
  fetch(url, {
    method: 'DELETE'
  })
    .then(response => response.json());
}

AppRegistry.registerComponent('HelloVRWorld', () => HelloVRWorld);
