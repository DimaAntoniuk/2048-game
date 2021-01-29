import { createStackNavigator } from 'react-navigation-stack'
import MainMenu from '../screens/MainMenu'
import Grid from '../screens/Grid'
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const AppNavigation = createStackNavigator(
    {
        MainMenu: { screen: MainMenu,
            navigationOptions: ({navigation}) => ({
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('Auth')}}
                    >
                        <Image
                            style={{width: 27, height: 27, marginLeft: 15, marginTop: 5}}
                            source={require('../assets/logout2-left.png')}
                        />  
                    </TouchableOpacity>
                ),
            })
        },
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