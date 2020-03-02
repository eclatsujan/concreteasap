import React from 'react';
import {AppState} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import OneSignal from 'react-native-onesignal';


import {connect} from 'react-redux';
import {actions, States} from '../../store';

import {appStyles} from '../../../assets/styles/app_styles'

import {userService} from '../../services/userService';

import AppLoading from '../../components/App/AppLoading';
import AppBackground from '../../components/App/AppBackground';
import {handleResponse} from "../../helpers/httpHandler";


class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            device_id: ""
        };
        OneSignal.init("8316b62b-6ae3-4a80-8c3d-35a7d7be86fc");
    }

    componentDidMount() {
        OneSignal.addEventListener("received", () => {
            // console.log("ok");
        });
        try {
            this._bootstrapAsync().then((res) => {

            });
        } catch (err) {
            console.log(err);
            this.props.navigation.navigate('Auth');
        }

    }

    async getDeviceIds() {
        return await new Promise(resolve => {
            OneSignal.addEventListener('ids', resolve);
        });
    }

    getBadgeCount(device_id) {
        // console.log(device_id);
        return fetch("https://onesignal.com/api/v1/players/" + device_id)
            .then((res) => {
                return res.json().then((json)=>{
                    if(res.status===200){
                        return typeof json["badge_count"]!=="undefined"?json["badge_count"]:0;
                    }
                    else{
                        return 0;
                    }
                });
            });
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        try {
            let user_token = await SecureStore.getItemAsync("user_token");
            let user_role = await SecureStore.getItemAsync("user_role");

            let user = await userService.getUser(user_token);

            this.props.updateUserState(user);

            const roles = ["rep", "contractor"];
            // let route="App";
            if (user_token === null || !roles.includes(user_role)) {
                throw "Error Found";
            }
            let device = await this.getDeviceIds();

            if(user.device_id===""){
                await userService.saveUserDeviceId(device.userId);
            }

            let route = user_role === "contractor" ? "MainContractorScreen" : "Rep";
            this.props.navigation.navigate(route);
        } catch (e) {
            // console.log(e);
            this.props.navigation.navigate("Auth");
        }

        this.props.apploading();
        // if(user_token!==null){
        //     try{
        //         console.log(user_token);
        //         if(user.device_id===""){
        //             let device=await this.getDeviceIds();
        //             if(device){
        //               userService.saveUserDeviceId(device.userId).catch((err)=>{
        //                   // console.log(err);
        //               });
        //             }
        //         }
        //
        //         if(user_role==="contractor"){
        //             this.props.navigation.navigate('App');
        //         }
        //         else if(user_role==="rep"){
        //             this.props.navigation.navigate('Rep');
        //         }
        //         else{
        //             this.props.navigation.navigate('Auth');
        //         }
        //     }
        //     catch(e){
        //         alert(e);
        //     }
        //
        // }
        // else{
        //     this.props.navigation.navigate('Auth');
        //     this.props.apploading();
        // }

    };

    // Render any loading content that you like here
    render() {
        return (
            <AppBackground loading="true"/>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserState: (user) => {
            return dispatch(actions.user.updateUserState(user))
        },
        apploading: () => {
            return dispatch(actions.app.loading(false));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
        app: state.get("app")
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
