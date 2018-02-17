import React from 'react';
import { Text, View, Sphere } from 'react-vr';

class Score extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log("SCORES: " + this.props.scores);
        return (<View>
            <Text style={{
                position: 'absolute',
                flexDirection: 'row',
                fontSize: 0.3,
                color: '#0033cc',
                transform: [{ translate: [0.8, 1.5, -3] }]
            }}>
                {this.props.scores}
            </Text>
        </View>);
    }
}
module.exports = Score;