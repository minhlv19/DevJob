import React from 'react';
import {FlatList, ActivityIndicator, Text, View, Image, StyleSheet, RefreshControl} from 'react-native';
import {mini, small_bold} from '../../asset/styles/styleText';

class CompaniesScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
        };
        this.componentDidMount();

    }

    componentDidMount() {
        return fetch('https://devjob.co/api/list-companies?token=0F405C9DD1DE1021140B07B8CE534693')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    refreshing: false,
                    dataSource: responseJson.datas.data,
                }, function () {

                });

            })
            .catch((error) => {
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
                        <View style={styles.container_item}>
                            <View style={styles.item_logo}>
                                <Image
                                    source={{
                                        uri: item.logo,
                                    }}
                                    style={styles.logo}

                                />
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.content_name}>{item.name}</Text>
                                <View style={styles.itemtype}>
                                    <Image source={require('../../asset/image/location.png')} style={styles.imageitem}/>
                                    <Text numberOfLines={1} style={styles.content_address}>{item.address}</Text>
                                </View>
                                <View style={styles.itemtype}>
                                    <Image source={require('../../asset/image/type.png')} style={styles.imageitem}/>
                                    <Text style={styles.content_type}>Company type</Text>
                                </View>
                            </View>
                            <View style={styles.count}>
                                <Text style={styles.count_item}>{item.count} Jobs</Text>
                            </View>
                        </View>

                    }
                    keyExtractor={({id}, index) => id}
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
};
const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            borderWidth: 1,
            marginBottom: 20,
        },

    container_item: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 5,
        padding: 4,
        marginLeft: 2,
        marginRight: 2,
    },
    logo: {

        height: 60,
        width: 110,
        padding: 10,


    },
    content: {
        flex: 2,
    },
    count: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',

    },
    item_logo: {

        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 100,
        marginRight: 10,


    },
    content_name: {
        width: '86%',
        ...small_bold,
    },
    content_address: {
        marginTop: 10,
        ...mini,
        color: '#0500f6',
        justifyContent: 'center',
        alignItems: 'center',
        writingDirection: 'auto',
        marginLeft: 6,
    },
    content_type: {
        marginTop: 10,
        ...mini,
        color: '#0500f6',
        justifyContent: 'center',
        alignItems: 'center',
        writingDirection: 'auto',
        marginLeft: 6,
    },
    count_item: {

        ...mini,
        color: '#0500f6',
    },
    imageitem: {
        width: 16,
        height: 16,
        padding: 8,
    },
    itemtype: {

        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',


    },

});


export default CompaniesScreen;
