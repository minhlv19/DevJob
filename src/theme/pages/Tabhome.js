import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import FeatureJob from './/FeatureJob';
import RewardJob from './/RewardJob';
import RewardDetail from "../details/Reward_detail";


const TabScreen = createMaterialTopTabNavigator(
    {
        RewardJob: {
            screen: RewardJob,
            navigationOptions: {
                tabBarLabel: 'Reward Job',
            },


        },
        FeatureJob: {
            screen: FeatureJob,
            navigationOptions: {
                tabBarLabel: 'Feature Job',
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
const DetailStack = createStackNavigator(
    {
        RewardDetail: {
            screen: RewardDetail,
            navigationOptions: {
                header: null,
            },
        },

    },
);

const TabHomeScreen = createStackNavigator(
    {

        TabScreen: {
            screen: TabScreen,
            navigationOptions: {
                header: null,
            },
        },
        RewardDetail:{
            screen:DetailStack,
            navigationOptions: {
                header: null,

            },
        }
    },
);


export default createAppContainer(TabHomeScreen);
