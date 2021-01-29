import { createStackNavigator } from 'react-navigation-stack'
import MainMenu from '../screens/MainMenu'
import Grid from '../screens/Grid'
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const AppNavigation = createStackNavigator(
    {
        MainMenu: { screen: MainMenu },
        Grid: { 
            screen: Grid,
            navigationOptions: ({navigation}) => ({
                gestureEnabled: false,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {navigation.goBack()}}
                    >
                        <Image
                            style={{width: 35, height: 35, marginLeft: 10}}
                            source={require('../assets/hamburger.png')}
                        />  
                    </TouchableOpacity>
                    
                ),
            })
        }
    },
    {
        initialRouteName: 'MainMenu',
    }
);

export default AppNavigation