import React from 'react';
import { Text, View, Sphere, Plane } from 'react-vr';

class Score extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log("SCORES: " + this.props.scores);
        var text = this.props.scores;
        var scores = text.sort(function (a, b) { return b - a });


        return (<View>
            <Plane
                dimWidth={2}
                dimHeight={3.5}
                style={{
                    color: '#339933',
                    transform: [{ translate: [-2, 0.1, -3] }]
                }}
            >

            </Plane>
            <Text style={{
                position: 'absolute',
                flexDirection: 'row',
                fontSize: 0.4,
                flex: 1,
                width: 3,
                color: '#ffff1a',
                transform: [{ translate: [-2.6, 2, -3] }]
            }} >
                Best time
            </Text>
            <Text style={{
                position: 'absolute',
                flexDirection: 'row',
                flex: 1,
                width: 3,
                flexDirection: 'column',
                alignItems: 'stretch',
                fontSize: 0.3,
                color: '#fff',
                transform: [{ translate: [-2.5, 1.6, -3] }]
            }}>
                {milisecondsToseconds(scores[0])}
                {"\n"}
                {milisecondsToseconds(scores[1])}
                {"\n"}
                {milisecondsToseconds(scores[2])}
                {"\n"}
                {milisecondsToseconds(scores[3])}
                {"\n"}
                {milisecondsToseconds(scores[4])}
                {"\n"}
                {milisecondsToseconds(scores[5])}
                {"\n"}
                {milisecondsToseconds(scores[6])}
                {"\n"}
                {milisecondsToseconds(scores[7])}
                {"\n"}
                {milisecondsToseconds(scores[8])}
                {"\n"}
                {milisecondsToseconds(scores[9])}
            </Text>
        </View >);
    }

}
function milisecondsToseconds(miliseconds) {
    var seconds = ((miliseconds % 60000) / 1000).toFixed(0);
    var minutes = Math.floor(miliseconds / 60000);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

}
function sortByBestScore() {

}
module.exports = Score;