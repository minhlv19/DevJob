import React, {Component} from 'react';
import moment from 'moment';
import {Text} from 'react-native';

class Time extends Component {
    constructor(props){
        super(props);
        this.date=props.time;
    }
    render() {
        const time=moment(this.date||moment.now()).fromNow();
        return (
            <Text>{time}</Text>
        );
    }
}

export default Time;
