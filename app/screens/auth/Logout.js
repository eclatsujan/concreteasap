import * as React from 'react';
import { ActivityIndicator,StatusBar,Text, View, TextInput, StyleSheet, Label, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { connect } from 'react-redux';

import { actions, States } from '../../store';

class LogoutScreen extends React.Component {
  constructor() {
    super();
    this._logout();
  }

  async _logout() {    
    console.log("ok");
    await SecureStore.deleteItemAsync("user_token");
    await SecureStore.deleteItemAsync("user_role");  
    this.props.doLogout();
    this.props.navigation.navigate('AuthLoading'); 
  }

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
    doLogout: () => {
      return dispatch(actions.app.loading(false))
    },
  }
}

export default connect(null,mapDispatchToProps)(LogoutScreen);