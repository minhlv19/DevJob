import React, {Component} from 'react';
import {View, Text, ActivityIndicator, FlatList, Image, StyleSheet, RefreshControl} from 'react-native';
import {medium_bold, small} from '../../asset/styles/styleText';
class CourseMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
        };
        this.componentDidMount();

    }

    componentDidMount() {
        return fetch(
            'https://devjob.co/api/courses?token=0F405C9DD1DE1021140B07B8CE534693',
        )
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    refreshing: false,
                    dataSource: responseJson.courses.data,

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
                    renderItem={({item}) =>
                        <View style={styles.content}>
                            <View>
                                <View style={styles.top_item}>
                                    <Image style={styles.avata} source={{uri: item.avatarC}}/>
                                </View>
                                <View style={styles.dates}>
                                    <Text  style={styles.item_date}> {item.title}</Text>
                                    <Text style={styles.item_date}>{item.teacher}</Text>
                                </View>
                            </View>
                            <View style={styles.titles}>
                                <Text numberOfLines={2} style={styles.title_text}>{item.contentShortCut}</Text>
                            </View>
                        </View>
                    }
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
    container: {

        flex: 1,
        backgroundColor:'#f3f3f3'


    },
    content: {

        borderRadius: 10,
        marginTop:10,
        marginLeft:6,
        marginRight:6,
    },
    avata: {
        width: '100%',
        height: 150,
        padding:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    titles:{
        backgroundColor: '#fff',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,


    },
    dates:{
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,

        alignItems:'center',
        alignSelf:'center',
        borderBottomWidth:0.7,
        borderColor:'#d2d2d2',
        width: '80%',
        paddingBottom:6


    },
    item_date:{
        ...small,
        textAlign:'center',
        color:'#0091ea',
        marginTop: 6,
    },
    title_text:{
        textAlign:'center',
        ...medium_bold,
        margin:10
    }

});

export default CourseMore;
