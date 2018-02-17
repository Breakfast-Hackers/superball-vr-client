import React from 'react';
import { View, VrButton, Text } from 'react-vr';

class DebugControls extends React.Component {

  render() {
    return (<View>
    <VrButton onClick={() => this.props.onLeft()} ><Text style={{
      fontSize: 0.1,
      textAlignVertical: 'center',
      transform: [{translate: [0, 0, -1.5]}]
    }} onInput={() => {}}>
    Go Left
    </Text></VrButton>

    <VrButton onClick={() => this.props.onRight()} ><Text style={{
      fontSize: 0.1,
      textAlignVertical: 'center',
      transform: [{translate: [0, 0, -1.5]}]
    }} onInput={() => {}}>
    Go Right
    </Text></VrButton>
    </View>);
  }

}

module.exports = DebugControls;
