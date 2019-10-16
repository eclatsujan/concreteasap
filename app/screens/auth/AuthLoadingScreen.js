import React from 'react';
import {ActivityIndicator, Dimensions, ImageBackground, StatusBar, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import OneSignal from 'react-native-onesignal';


import { connect } from 'react-redux';
import { actions, States } from '../../store';

import {appStyles} from '../assets/app_styles'

import {userService} from '../../services/userService';

import AppLoading from '../../components/AppLoading';
import AppBackground from '../../components/AppBackground';


class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            device_id:""
        };
        console.log("ok");
        // OneSignal.init("8316b62b-6ae3-4a80-8c3d-35a7d7be86fc");
    }

    componentWillMount(){
        this._bootstrapAsync();
        // this.getDeviceIds().then((device)=>{
        //     this.setState({device_id:device.userId});

        // });

    }

    async getDeviceIds(){
        return await new Promise(resolve=>{
            OneSignal.addEventListener('ids', resolve);
        });
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        let user_token=await SecureStore.getItemAsync("user_token");
        let user_role=await SecureStore.getItemAsync("user_role");
        let user= await userService.getUser(user_token);
        console.log(user_token);
        if(user_token!==null){
            try{
                if(user.device_id===""){
                    userService.saveUserDeviceId(this.state.device_id).catch((err)=>{
                        console.log(err);
                    });
                }

                if(user_role==="contractor"){
                    this.props.navigation.navigate('App');
                }
                else if(user_role==="rep"){
                    this.props.navigation.navigate('Rep');
                }
                else{
                    this.props.navigation.navigate('Auth');
                }
            }
            catch(e){
                alert(e);
            }

        }
        else{
            this.props.navigation.navigate('Auth');
        }

    }

    // Render any loading content that you like here
    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <AppBackground>
              <AppLoading/>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (token) => {
            return dispatch(actions.user.loadUserState(token))
        }
    }
};

const mapStateToProps = (state) => {
    const {user,app}=state;
    return {user,app};
};

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoadingScreen);
