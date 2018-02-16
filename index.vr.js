import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box,
  Plane,
  Sphere
} from 'react-vr';
//import Board from './Board.js';

export default class HelloVRWorld extends React.Component {
  render() {
    return (
      <View>
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

        <Sphere
          radius={0.05}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: '#F00',
            transform: [{translate: [-0.45, 0, -1.9]}]
          }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('HelloVRWorld', () => HelloVRWorld);
