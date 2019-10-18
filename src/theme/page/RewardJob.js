import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Text, View, Image,StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import { mini, small_bold} from '../../asset/styles/styleText';


export default class RewardJob extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true};

    }

    componentDidMount() {
        return fetch('https://devjob.co/api/home?token=0F405C9DD1DE1021140B07B8CE534693')
            .then((response) => response.json())
            .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.jobs_reward.map(e=>{
                            responseJson.locations.forEach(item=>{
                                if(e.location_id==item.id){
                                    e['location_name']=item.name
                                }
                            });


                            return e
                        }),


                    }, function () {

                    });

                },
            )
            .catch((error) => {
                console.error(error);
            });


    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <FlatList
                   // onRefresh={() => this.onRefresh()}
                    // refreshing={this.state.isFetching}
                    data={this.state.dataSource}

                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <View style={styles.content}>

                        <View style={{width:120,height:120}}>
                            <Image
                                source={{
                                    uri: item.logo,
                                }}
                                style={{width:'50%',height:'50%',borderRadius:50}}

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
                                {item.name}
                            </Text>
                            </View>

                            <View style={styles.styleicon}>
                                <Image source={require('../../asset/image/location.png')} style={styles.imageitem}/>

                                <Text style={styles.textname}>{item.location_name}</Text>
                            </View>
                            <View style={styles.styleicon}>
                                {item.skills.map(e=><Text key={e.name} style={styles.skill}>#{e.name}</Text>)}
                            </View>
                        </View>
                    </View>}
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
    content:{
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 5,
        padding: 4,
        marginLeft:2,
        marginRight:2,

    },
    type:{
        flexDirection: 'column',
        width: '80%'

    },
    texttitle:{
        flexDirection: 'row',
        width:'86%',
           ...small_bold,

    },
    textname:{
        width:'88%',
        writingDirection:'auto',
            ...mini,
    },
    skill:{
width:'22%',
        writingDirection:'auto',
        ...mini,
        flexDirection:'row',
        borderWidth:1,
        borderRadius: 5,
        borderColor:'#3e79ff',
        textAlign: 'center',
        color:'#3e79ff'


    },
    styleicon:{
        marginTop:6,
        flexDirection:'row',
        alignItems:'center'

    },
    imageitem:{
        width:16,
        height: 16,
        padding: 8,
    }
});




