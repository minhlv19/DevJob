import React, {Component} from 'react';
import moment from 'moment';
import {Text} from 'react-native';

class Time extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const time=moment(this.props.date||moment.now(),'YYYY-MM-DD HH:mm:ss').fromNow();
        return (
            <Text>{time}</Text>
        );
    }
}

export default Time;
