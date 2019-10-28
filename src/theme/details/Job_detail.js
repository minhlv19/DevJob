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
import { Header } from 'react-native-elements';






class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],

        };
        this.componentDidMount();

    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('item', 'title'),
        };
    };
    componentDidMount(){
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
            <View>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
<ScrollView>
            <View style={styles.container}>


                    <View>
                        <Text>Job OverView</Text>
                        <View>
                            <View style={{flexDirection:'row',marginTop:5}}>

                                <View style={styles.customoverview}>
                                    <Image source={require('../../asset/image/bonus_item.png')} style={styles.imageitem}/>
                                    <View style={{marginLeft:10}}>
                                        <Text>Bounty for Referer</Text>
                                        <Text> {this.state.data.bonus}$</Text>
                                    </View>
                                </View>
                                <View style={styles.customoverview}>
                                    <Image source={require('../../asset/image/money.png')} style={styles.imageitem}/>
                                    <View style={{marginLeft:10}}>
                                        <Text>Offerd Salary</Text>
                                        <Text>{this.state.data.salary_min} - {this.state.data.salary_max}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',marginTop:5}}>
                                <View style={styles.customoverview}>
                                    <Image source={require('../../asset/image/rank_item.png')} style={styles.imageitem}/>
                                    <View style={{marginLeft:10}}>
                                        <Text>Level Job</Text>
                                        <Text>{this.state.data.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.customoverview}>
                                    <Image source={require('../../asset/image/companyitem.png')} style={styles.imageitem}/>

                                    <View style={{marginLeft:10}}>
                                        <Text>Company Name</Text>
                                        <Text>{this.state.data1.name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',marginTop:5}}>
                                <View style={styles.customoverview}>
                                    <Image source={require('../../asset/image/location.png')} style={styles.imageitem}/>
                                    <View style={{marginLeft:10,width:'80%'}}>
                                        <Text>Address</Text>
                                        <Text >{this.state.data.address}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
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
                            <Button title="Save"/>
                        </TouchableOpacity>
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

export default JobDetail
