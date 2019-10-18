import React, {Component} from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../menu/HomeScreen';
import BlogScreen from '../menu/BlogScreen';
import MoreScreen from '../menu/MoreScreen';
import CompaniesScreen from '../menu/CompaniesScreen';
import JobsScreen from '../menu/JobsScreen';
import RewardDetail from "../details/Reward_detail";




const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
            },
        },
        RewardDetail:{
            screen:RewardDetail,
            // navigationOptions: {
            //     header: null,
            // },
        }



    },
);

const BlogStack = createStackNavigator(
    {
        Blog: {
            screen: BlogScreen,
            navigationOptions: {
                header: null,
            },
        },
    },
);
const CompaniesStack = createStackNavigator(
    {
        Companies: {
            screen: CompaniesScreen,
            navigationOptions: {
                header: null,
            },
        },

    },
);
const JobsStack = createStackNavigator(
    {
        Jobs: {
            screen: JobsScreen,
            navigationOptions: {
                header: null,
            },
        },
    },
);
const MoreStack = createStackNavigator(
    {
        More: {
            screen: MoreScreen,
            navigationOptions: {
                header: null,
            },

        },
    },
);
const Menu = createBottomTabNavigator(
    {

        Jobs: {
            screen: JobsStack,
        },
        Companies: {
            screen: CompaniesStack,
        },
        Home: {
            screen: HomeStack,
            navigationOptions:{

            }
        },
        More: {
            screen: MoreStack,
        },
        Blog: {
            screen: BlogStack,
        },

    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                if (routeName === 'Jobs') {
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
                } else if (routeName === 'Companies') {
                    return (
                        <Image
                            source={
                                focused
                                    ? require('../../asset/image/company_click.png')
                                    : require('../../asset/image/company.png')
                            }
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    );
                } else if (routeName === 'Home') {
                    return (
                        <Image
                            source={
                                focused
                                    ? require('../../asset/image/home_click.png')
                                    : require('../../asset/image/home.png')
                            }
                            style={
                                {
                                    width: 20,
                                    height: 20,
                                }
                            }

                        />
                    );
                } else if (routeName === 'More') {
                    return (
                        <Image

                            source={
                                focused
                                    ? require('../../asset/image/mores_click.png')
                                    : require('../../asset/image/mores.png')
                            }
                            style={
                                {
                                    width: 20, height: 20,
                                }
                            }
                        />
                    );
                } else if (routeName === 'Blog') {
                    return (
                        <Image
                            source={
                                focused
                                    ? require('../../asset/image/blog_click.png')
                                    : require('../../asset/image/blog.png')
                            }
                            style={
                                {width: 20, height: 20}
                            }

                        />
                    );
                }
            },


        }),
        initialRouteName: 'Home',
        tabBarOptions: {

            activeTintColor: '#0a11f0'
            , inactiveTintColor: 'gray',
        },
    },
);

const Mian = createStackNavigator(
    {
        Menu: {
            screen: Menu, navigationOptions: {
                header: null,
            },
        },


    },
    {initialRouteName: 'Menu', headerLayoutPreset: 'center'},
);
export default createAppContainer(Mian);
