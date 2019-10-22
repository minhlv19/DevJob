import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {diff} from 'react-native-reanimated';
import {mini, small_bold} from '../../asset/styles/styleText';

class JobsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
        };
        this.componentDidMount();

    }

    componentDidMount() {
        return fetch(
            'https://devjob.co/api/job/job-listings?token=0F405C9DD1DE1021140B07B8CE534693',
        )
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    refreshing: false,
                    dataSource: responseJson.jobs.data.map(e => {
                        responseJson.countSkill.forEach(item => {
                            if (e.cate_id == item.cate_id) {
                                e['skill'] = item.name;
                            }
                        });
                        return e;
                    }),

                });


            })
            .catch(error => {
                console.error(error);
            });

    }


    onRefresh() {
        //Clear old data of the list
        this.setState({dataSource: []});
        //Call the Service to get the latest data
        this.componentDidMount();
    }

    render() {
        if (this.state.refreshing) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (

            <View style={styles.container}>
                <FlatList

                    data={this.state.dataSource}

                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <View style={styles.content}>

                        <View style={styles.item_container} onPress={()=> {
                            console.log('ahihi');
                        }}>
                            <Image
                                source={{
                                    uri: item.logo,
                                }}
                                style={styles.logo}

                            />
                        </View>
                        <View style={styles.type}>
                            <View>

                                <Text style={styles.texttitle}>
                                    {item.title}
                                </Text></View>
                            <View style={styles.styleicon}>
                                <Image source={require('../../asset/image/companyitem.png')} style={styles.imageitem}/>
                                <Text style={styles.textname}>
                                    {item.name_company}
                                </Text>
                            </View>

                            <View style={styles.styleicon}>
                                <Image source={require('../../asset/image/location.png')} style={styles.imageitem}/>

                                <Text style={styles.textname}>{item.address_job}</Text>
                            </View>
                            <View style={styles.styleicon}>
                                <Image source={require('../../asset/image/money.png')} style={styles.imageitem}/>

                                <Text style={styles.textname}>{item.salary_min} - {item.salary_max}</Text>
                            </View>
                            <View style={styles.styleicon}>
                                <Image source={require('../../asset/image/bonus.png')} style={styles.imageitem}/>

                                <Text style={styles.textname}>{item.bonus}</Text>
                            </View>
                            <View style={styles.styleicon}>

                                <Text  style={styles.skills}>{item.skill}</Text>
                            </View>

                        </View>
                    </View>}
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            borderWidth: 1,
        },
    // images: {
    //  width:"80%",
    //     height:"80%"
    //
    //
    // },
    content: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 5,
        padding: 4,
        marginLeft: 2,
        marginRight: 2,

    },
    type: {
        flexDirection: 'column',
        width: '80%',

    },
    texttitle: {
        flexDirection: 'row',
        width: '86%',
        ...small_bold,

    },
    textname: {
        width: '88%',
        writingDirection: 'auto',
        ...mini,
        color: '#3e79ff',
    },
    skills: {
        width: 'auto',
        writingDirection: 'auto',
        ...mini,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#3e79ff',
        textAlign: 'center',
        color: '#3e79ff',
        margin:4,
        padding:4


    },
    styleicon: {
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',

    },
    imageitem: {
        width: 16,
        height: 16,
        padding: 8,
    },
    item_container: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: 100,
        height: 80,
        alignItems: 'center'
    },
    skill: {
        width: '22%',
        writingDirection: 'auto',
        ...mini,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#3e79ff',
        textAlign: 'center',
        color: '#3e79ff',


    },
});
export default JobsScreen;
