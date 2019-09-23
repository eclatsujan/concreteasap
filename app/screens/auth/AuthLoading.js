import React from 'react';
import {ActivityIndicator,StatusBar,StyleSheet,View} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { connect } from 'react-redux';

import { actions, States } from '../../store';

class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  } 

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {  
    
    let user_token=await SecureStore.getItemAsync("user_token");
    let user_role=await SecureStore.getItemAsync("user_role");    
    // console.log(user_token);
    if(user_token!==null){
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
    else{
      this.props.navigation.navigate('Auth');
    }
      
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token) => {
      return dispatch(actions.user.loadUserState(token))
    }
  }
}

const mapStateToProps = (state) => {
  const {user,app}=state;
  return {user,app};
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoadingScreen);