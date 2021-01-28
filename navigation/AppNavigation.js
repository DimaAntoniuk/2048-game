import { createStackNavigator } from 'react-navigation-stack'
import MainMenu from '../screens/MainMenu'
import Grid from '../screens/Grid'

const AppNavigation = createStackNavigator(
    {
        Home: { screen: MainMenu },
        Grid: { screen: Grid }
    },
    {
        initialRouteName: 'MainMenu',
    }
);

export default AppNavigation