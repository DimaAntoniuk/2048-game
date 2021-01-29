import { createStackNavigator } from 'react-navigation-stack'
import MainMenu from '../screens/MainMenu'
import Grid from '../screens/Grid'
import Challenges from '../screens/Challenges'

const AppNavigation = createStackNavigator(
    {
        MainMenu: { screen: MainMenu },
        Grid: { screen: Grid },
        Challenges: { screen: Challenges },
    },
    {
        initialRouteName: 'MainMenu',
    }
);

export default AppNavigation