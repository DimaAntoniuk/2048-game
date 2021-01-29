import { createStackNavigator } from 'react-navigation-stack'
import MainMenu from '../screens/MainMenu'
import Grid from '../screens/Grid'
import Challenges from '../screens/Challenges'
import HowToPlay from '../screens/HowToPlay'

const AppNavigation = createStackNavigator(
    {
        MainMenu: { screen: MainMenu },
        Grid: { screen: Grid },
        Challenges: { screen: Challenges },
        HowToPlay: { screen: HowToPlay },
    },
    {
        initialRouteName: 'MainMenu',
    }
);

export default AppNavigation