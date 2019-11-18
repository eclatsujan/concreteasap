import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "../screens/auth/Login";
import RegisterLanding from "../screens/auth/RegisterLanding";
import ForgetPassword from '../screens/auth/ForgetPassword';
import ResetPasswordToken from '../screens/auth/ResetPasswordToken';
import Register from '../screens/auth/Register';
//User Profile Screen
import UserProfile from "../screens/User/Profile/UserProfile";
import EditUserProfile from "../screens/User/Profile/EditUserProfile";


export const ResetPasswordStack = createStackNavigator({
        "Forget Password": ForgetPassword,
        "Reset Password Token": ResetPasswordToken,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

export const UserProfileStack=createStackNavigator({
    "My Profile":UserProfile,
    "Edit User Profile":EditUserProfile
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});


export const AuthStack = createStackNavigator({
        SignIn: LoginScreen,
        "Register Landing": RegisterLanding,
        "Reset Password": ResetPasswordStack,
        Register: Register,
        // RegContractor:RegisterContractor,
        // repRegister:repRegister,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);
