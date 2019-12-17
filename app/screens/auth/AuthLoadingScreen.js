import React from 'react';
import * as SecureStore from 'expo-secure-store';

import OneSignal from 'react-native-onesignal';


import { connect } from 'react-redux';
import { actions, States } from '../../store';

import {appStyles} from '../../../assets/styles/app_styles'

import {userService} from '../../services/userService';

import AppLoading from '../../components/AppLoading';
import AppBackground from '../../components/AppBackground';


class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            device_id:""
        };
        OneSignal.init("8316b62b-6ae3-4a80-8c3d-35a7d7be86fc");
    }

    componentDidMount(){
        try{
            this._bootstrapAsync().then((res)=>{});
        }
        catch(err) {
            this.props.navigation.navigate('Auth');
        }

    }

    async getDeviceIds(){
        return await new Promise(resolve=>{
            OneSignal.addEventListener('ids', resolve);
        });
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        let user_token=await SecureStore.getItemAsync("user_token").catch((err)=>{
            this.props.navigation.navigate('Auth');
        });
        let user_role=await SecureStore.getItemAsync("user_role").catch((err)=>{
            this.props.navigation.navigate('Auth');
        });
        let user= await userService.getUser(user_token);
        this.props.updateUserState(user);
        if(user_token!==null){
            try{
                if(user.device_id===""){
                    let device=await this.getDeviceIds();
                    if(device){
                      userService.saveUserDeviceId(device.userId).catch((err)=>{
                          // console.log(err);
                      });
                    }
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

    };

    // Render any loading content that you like here
    render() {
        return (
            <AppBackground loading="true" />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserState: (user) => {
            return dispatch(actions.user.updateUserState(user))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        user:state.get("user"),
        app:state.get("app")
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoadingScreen);
