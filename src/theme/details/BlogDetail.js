import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image,
    Button
} from "react-native";
import HTML from "react-native-render-html";


export default class  BlogDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],

        };
        this.componentDidMount();

    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('item'), 'item sang')
        const slug = this.props.navigation.getParam('item').slug;
        fetch(`https://devjob.co/api/job/detail?slug=${slug}&token=0F405C9DD1DE1021140B07B8CE534693`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson, 'aaaaa');

                this.setState({
                    data: responseJson.detail,
                    data1: responseJson.company,

                });


            }, function () {

            })
            .catch((error) => {
                console.error(error);
            });


    }


    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
            )
        }

        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RewardJob')}>
                        <Image source={require('../../asset/image/back.png')}
                               style={{width: 20, height: 20, marginLeft: 10}}/>
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', textAlign: 'center', alignItems: 'center', flex: 2}}>
                        <Text>{this.state.data.title}</Text>
                    </View>

                </View>
                <ScrollView>
                    <View>

                        <View>
                            <Text>Job Type</Text>
                            <View style={{marginLeft:10,marginRight:10,whiteSpace: 'pre-wrap'}}>
                                <Text>Job Description</Text>
                                <HTML
                                    style={{marginLeft:10,marginRight:10,whiteSpace: 'pre-wrap'}}
                                    html={this.state.data.description}
                                />
                            </View>
                            <View style={{marginLeft:10,marginRight:10,whiteSpace: 'pre-wrap'}}>
                                <Text>Job Description</Text>
                                <HTML
                                    style={{marginLeft:10,marginRight:10,whiteSpace: 'pre-wrap'}}
                                    html={this.state.data.requirement}
                                />
                            </View>
                            <View style={{marginLeft:10,marginRight:10,whiteSpace: 'pre-wrap',marginBottom:10}}>
                                <Text>Job Description</Text>
                                <HTML
                                    style={{marginLeft:10,marginRight:10,whiteSpace: 'pre-wrap'}}
                                    html={this.state.data.benefit}
                                />
                            </View>

                        </View>
                        <TouchableOpacity>
                            <Button title="Apply"/>
                            <Button title="Save"/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


            </View>
        );

    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 20 : 0,
    },
    header: {
        height: 50,
        backgroundColor: '#0091ea',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center'
    },
    customoverview: {
        flex: 1,
        flexDirection: 'row'

    },
    imageitem:{
        width:40,
        height: 40
    }

});

