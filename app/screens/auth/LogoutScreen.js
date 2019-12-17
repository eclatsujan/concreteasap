import * as React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import {connect} from 'react-redux';

import {userService} from '../../services/userService';

import {actions} from '../../store';

class LogoutScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this._logout();
    }

    async _logout() {
        try {
            await this.props.doLogout();
            await userService.removeUserDeviceId();
            await SecureStore.deleteItemAsync("user_token");
            await SecureStore.deleteItemAsync("user_role");
            this.props.navigation.navigate('AuthLoading');
        } catch (err) {
            await SecureStore.deleteItemAsync("user_token");
            await SecureStore.deleteItemAsync("user_role");
            this.props.navigation.navigate('AuthLoading');
        }

    }

    render() {
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
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

export default connect(null, mapDispatchToProps)(LogoutScreen);
