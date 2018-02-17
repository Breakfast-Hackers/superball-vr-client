import React from 'react';
import { Sphere } from 'react-vr';

class Obstacle extends React.Component {
  render() {
    return <Sphere
      radius={0.05}
      widthSegments={20}
      heightSegments={12}
      style={{
        color: '#00F',
        transform: [{ translate: [ 0, 1, -3] }]
      }}
    />
  }
}

module.exports = Obstacle;
