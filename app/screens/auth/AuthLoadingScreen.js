import React from 'react';
import {ActivityIndicator, Dimensions, ImageBackground, StatusBar, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { connect } from 'react-redux';
import { actions, States } from '../../store';

import {appStyles} from '../assets/app_styles'

import {userService} from '../../services/userService';

import OneSignal from 'react-native-onesignal';

class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            device_id:""
        };
        OneSignal.init("8316b62b-6ae3-4a80-8c3d-35a7d7be86fc");          
    }

    componentWillMount(){
        this.getDeviceIds().then((device)=>{
            this.setState({device_id:device.userId});
            this._bootstrapAsync();
        });
        
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
            <ImageBackground source={require("../../../assets/concrete-background.png")} style={{width,height}}>
                <View>
                    <ActivityIndicator />
                    <StatusBar barStyle="default" />
                </View>
            </ImageBackground>
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