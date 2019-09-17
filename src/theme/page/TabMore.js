import {createAppContainer,} from 'react-navigation';
import {createMaterialTopTabNavigator,} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import EventMore from './EventMore';
import Course from './Course';
const TabScreen = createMaterialTopTabNavigator(
    {
        EvenMore: {
            screen: EventMore,
            navigationOptions:{
                tabBarLabel:"Event",
            },

        },
        Course: {
            screen: Course,
            navigationOptions:{
                tabBarLabel:"Course",
            },
        },
    }, {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000000',
            inactiveTintColor: '#9a9a9a',
            style: {
                backgroundColor: '#ffffff',
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    },
);


const TabMoreScreen = createStackNavigator(
    {

        TabScreen: {
            screen: TabScreen,
            navigationOptions: {
                header:null,
            },
        },
    },
);



export default createAppContainer(TabMoreScreen);
