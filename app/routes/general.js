import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from '../screens/auth/ForgetPassword';
import ResetPasswordToken from '../screens/auth/ResetPassword';
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
        Register:Register,
        "Reset Password":ResetPasswordStack,
        RegContractor:RegisterContractor,
        repRegister:repRegister,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }}
);
