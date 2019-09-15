import React, {Component} from 'react';
import {Image} from 'react-native';
import {createAppContainer,} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screen/HomeScreen';
import JobScreen from '../screen/JobScreen';

const HomeStack = createStackNavigator(
    {
        Home:{
            screen:HomeScreen,
            navigationOptions: {
                header: null,
            }
        },
    }
);
const JobStack = createStackNavigator(
    {
        Job:{
            screen:JobScreen,
            navigationOptions: {
                header: null,
            }
        },
    }
);
const Menu = createBottomTabNavigator(
    {

        Home: {
            screen: HomeStack,


        },
        Job: {
            screen: JobStack,


        },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                if (routeName === 'Home') {
                    return (
                        <Image

                            source={
                                focused
                                    ? require('../../asset/image/home_click.png')
                                    : require('../../asset/image/home.png')
                            }
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    );
                }else if(routeName === 'Job'){
                    return (
                        <Image

                            source={
                                focused
                                    ? require('../../asset/image/job_click.png')
                                    : require('../../asset/image/job.png')
                            }
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    );
                }
            }}),
    }
);
const Main = createStackNavigator(
    {
        Menu: {
            screen: Menu, navigationOptions: {
                header: null,
            }
        },

    },
    {initialRouteName: "Menu", headerLayoutPreset: 'center'}
);

export default createAppContainer(Main)


