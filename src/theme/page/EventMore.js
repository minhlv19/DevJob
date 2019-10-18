import React, {Component} from 'react';
import {View,Text} from 'react-native';
class EventMore extends Component {
    componentDidMount(){
        return fetch(
            'https://devjob.co/api/home?token=0F405C9DD1DE1021140B07B8CE534693'
        )
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    refreshing: false,
                    //Setting the data source for the list to render
                    dataSource: responseJson
                });
            })
            .catch(error => {
                console.error(error);
            });
    }


    render() {
        return (
        <View>
            <Text>
                em la cao day
            </Text>
        </View>
        );
    }
}

export default EventMore;
