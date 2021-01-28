import { createStackNavigator } from 'react-navigation-stack'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

const AuthNavigation = createStackNavigator(
    {
        SignIn: { screen: SignIn },
        SignUp: { screen: SignUp }
    },
    {
        initialRouteName: 'SignIn',
        headerMode: 'none'
    }
);

export default AuthNavigation