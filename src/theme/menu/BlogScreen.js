import React, {Component} from 'react';

//This is an example code for React Native Swipe Down  to Refresh ListView Using RefreshControl//
//import react in our code.
import {
    Image,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    View,
    Alert,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import Timeago from '../pages/time'
import {mini, small_bold} from '../../asset/styles/styleText';
import Moment from 'react-moment';

//import all the components we are going to use.
class BlogScreen extends Component {
    constructor(props) {
        super(props);
        //True to show the loader
        this.state = {
            isLoading: true,
            refreshing: true,
            dataSource: [],
        };

        //Running the getData Service for the first time

        this.componentDidMount();
    }

    componentDidMount() {
        return fetch('https://devjob.co/api/blog?token=0F405C9DD1DE1021140B07B8CE534693')
            .then((response) => response.json())
            .then((responseJson) => {
                    console.log(responseJson);

                    this.setState({
                        refreshing: false,
                        dataSource: responseJson.blogs.data,


                    }, function () {

                    });

                },
            )
            .catch((error) => {
                console.error(error);
            });


    }

    ListViewItemSeparator = () => {
        return (
            //returning the listview item saparator view
            <View
                style={{
                    height: 0.2,
                    width: '90%',
                    backgroundColor: '#808080',
                }}
            />
        );
    };

    onRefresh() {
        //Clear old data of the list
        this.setState({dataSource: []});
        //Call the Service to get the latest data
        this.componentDidMount();
    }

    render() {

        if (this.state.refreshing) {
            return (
                //loading view while data is loading
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (
            //Returning the ListView

            <SafeAreaView style={{flex: 1}}>
                <View style={styles.MainContainer}>

                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        enableEmptySections={true}
                        renderItem={({item}) => (

                            <View
                                style={styles.rowViewContainer}
                            >
                                <Image style={styles.logoimage} source={{uri: item.avatar_blog}}></Image>

                                <View style={styles.body}>
                                    <Text style={styles.title} onPress={() => alert(item.id)}>
                                        {item.title}
                                    </Text>
                                    <Text style={{paddingTop:2,}}>{item.contentShortCut}</Text>
                                    <View style={styles.styleicon}>
                                        <Image source={require('../../asset/image/calendar_50px.png')}
                                               style={styles.imageitem}/>
                                        <Text style={styles.textname}>
                                            <Timeago date={item.created_at}/>
                                        </Text>
                                    </View>

                                    <View style={styles.styleicon}>
                                        <Image source={require('../../asset/image/location.png')}
                                               style={styles.imageitem}/>
                                        <Text>{item.viewCount}
                                        </Text>

                                    </View>

                                </View>
                            </View>

                        )}

                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
    },
    rowViewContainer: {
        fontSize: 20,
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoimage: {
        width: 100, height: 100, alignItems: 'center',
    },
    body: {
        flex: 1, justifyContent: 'center', marginLeft: '8%',
    },
    title: {
        fontSize: 16,
        ...small_bold,
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
    textname: {
        width: '88%',
        writingDirection: 'auto',
        ...mini,
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

export default BlogScreen;
