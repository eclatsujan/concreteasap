import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "../screens/auth/Login";
import Register from "../screens/auth/Register";
//contractor files
import RegisterContractor from '../screens/contractor/Register';
import repRegister from '../screens/Rep/Register';

export const AuthStack = createStackNavigator({
        SignIn: LoginScreen,
        Register:Register,
        RegContractor:RegisterContractor,
        repRegister:repRegister,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }}
);