import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "../screens/auth/Login";
import RegisterLanding from "../screens/auth/RegisterLanding";
import ForgetPassword from '../screens/auth/ForgetPassword';
import ResetPasswordToken from '../screens/auth/ResetPasswordToken';
import Register from '../screens/auth/Register';
//contractor files
import RegisterContractor from '../screens/contractor/Register';
import repRegister from '../screens/Rep/Register';




export const ResetPasswordStack=createStackNavigator({
  "Forget Password":ForgetPassword,
  "Reset Password Token":ResetPasswordToken,
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  });

export const AuthStack = createStackNavigator({
        SignIn: LoginScreen,
        "Register Landing":RegisterLanding,
        "Reset Password":ResetPasswordStack,
        Register:Register,
        // RegContractor:RegisterContractor,
        // repRegister:repRegister,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }}
);
