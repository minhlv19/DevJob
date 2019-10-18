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
    FlatList,
    RefreshControl
} from "react-native";
import HTML from "react-native-render-html";


class RewardDetail extends Component {
    // static navigationOptions = ({navigation}) => {
    //     return {
    //
    //         //Heading/title of the header
    //         title: navigation.getParam(),
    //         //Heading style
    //         headerStyle: {
    //             backgroundColor: navigation.getParam('BackgroundColor', '#ffffff'),
    //         },
    //         //Heading text color
    //         headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    //
    //         headerLeft: (
    //             <TouchableOpacity style={styles.leftheader} onPress={() => navigation.navigate('RewardJob')}>
    //                 <Image style={styles.iconback} source={require('../../asset/image/back.png')}/>
    //             </TouchableOpacity>
    //         ),
    //     };
    // };

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            data1:[],

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
                    data1:responseJson.company,

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

                <ScrollView>
    <View>
        <Text>Job OverView</Text>
        <View>
            <View>
                <View>
                    <Text>Bounty for Referer</Text>
                <Text> {this.state.data.bonus}$</Text>
                    <Text>{this.state.data1.name}</Text>
                    <Text>{this.state.data.name}</Text>
                    <Text>{this.state.data.address}</Text>
                    <Text>{this.state.data.salary_min} - {this.state.data.salary_max}</Text>
                    <Text>date</Text>

                </View>
                <View>
                    <Text>Job Type</Text>
                    <HTML
                    html={this.state.data.description}
                    />



                </View>
            </View>
        </View>

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
    Header: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: Platform.OS == 'ios' ? 20 : 0,
    },
    HeaderInsideText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    TextViewStyle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        margin: 5,
        padding: 7,
    },
    iconback: {
        width: 20,
        height: 20,
        marginLeft: 20
    },
    // leftheader:{
    //
    //     width:10,
    //     height:10
    // }
});


export default RewardDetail
