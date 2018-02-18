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
  VrButton,
  PointLight
} from 'react-vr';

import Board from './Board.js';
import Ball from './Ball.js';
import Timer from './Timer.js';
import Obstacle from './Obstacle.js';
import Score from './Score.js';

import DebugControls from './DebugControls.js';

const Stomp = require('stompjs/lib/stomp.js').Stomp;

const client = Stomp.client('wss://superball.herokuapp.com/superball-websocket/websocket');
client.debug = message => {};

export default class HelloVRWorld extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      boardOffset: 0,
      currentBallPosition: 0,
      targetBallPosition: 0,
      obstacles: [],
      isGameRunning: false,
      time: 0,
      scores: [0, 0, 0]
    }

    this.tick = this.tick.bind(this);

    let self = this;

    client.connect({}, frame => {
      console.log('connected: ' + frame);

      client.subscribe('/topic/movements', message => {
        const movement = JSON.parse(message.body);
        const position = movement.position;

        self.setState({ targetBallPosition: position * 0.4 })
      });

      client.subscribe('/topic/commands', message => {
        const command = JSON.parse(message.body)
        console.log('command: ' + command.action);

        if (command.action == 'start') {
          self.getStartPosition()
            .then(position => {
              self.setState({ obstacles: [], isGameRunning: true, targetBallPosition: position, currentBallPosition: position });
              self.tick();
            });
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

      client.subscribe('/topic/highscore', (message) => {
        const highscore = JSON.parse(message.body)
        self.setState({ scores: highscore.scores });
        console.log('SCORES: ' + highscore.scores);
      });

    });

  }

  componentDidMount() {
    fetch('https://superball.herokuapp.com//api/highscores', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      }).then(json => {
        this.setState({ scores: json.scores });
      });
  }

  getStartPosition() {
    return new Promise((resolve, reject) => {
      fetch('https://superball.herokuapp.com/api/position', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(json => {
          resolve(json.position * 0.4);
        })
        .catch(error => reject(error));
    });
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

      if (updatedPositionY < -0.5) {
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

    this.setState({
      boardOffset: boardOffset,
      obstacles: updatedObstacles,
      currentBallPosition: currentBallPosition,
      targetBallPosition: targetBallPosition,
      isGameRunning: !collisionDetected
    });

    if (!collisionDetected) {
      setTimeout(() => this.tick(), 5);
    } else {
      console.log("oh, oh, you lost");
      gameOver();
    }
  }

  render() {

    let obstacles = this.state.obstacles.map((model, index) => {
      return <Obstacle key={"Obstacle-" + index} positionX={model.positionX} positionY={model.positionY} speed={model.speed} color={model.color} animate={this.state.isGameRunning} />
    });

    return (
      <Animated.View>
        <Pano source={asset('light-show.jpg')} />
        <Board offset={this.state.boardOffset} />
        <Score scores={this.state.scores} />
        <Timer time={this.state.time} />
        <Ball position={this.state.currentBallPosition} animate={this.state.isGameRunning} />
        {obstacles}
        <PointLight />
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
