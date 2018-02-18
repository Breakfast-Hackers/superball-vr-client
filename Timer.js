import React from 'react';
import { View, Plane, Text } from 'react-vr';

class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={{ flexDirection: 'row' }}>
            <Plane
                dimWidth={0.9}
                dimHeight={0.5}
                style={{
                    color: '#000',
                    transform: [{ translate: [1, 1.3, -3] }]
                }}
            />
            <Text style={{
                position: 'absolute',
                flexDirection: 'row',
                fontSize: 0.3,
                color: '#c00',
                transform: [{ translate: [0.8, 1.5, -3] }]
            }} >
                {this.props.time}
            </Text>
        </View>
        );

    }
}
module.exports = Timer;
