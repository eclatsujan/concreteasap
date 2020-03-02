import React from 'react';
import {View, Text, Image, StatusBar, TouchableOpacity} from 'react-native';
import {appStyles} from "../../../../assets/styles/app_styles";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";

// const LOGO_URL = 'https://i.imgur.com/BbYaucd.png';


class DrawerHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const {navigateToCallback}=this.props;
        return (
            <TouchableOpacity onPress={() => navigateToCallback('HomeScreen')}>
                <View
                    style={[appStyles.py_15, appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom, appStyles.w_100]}
                >
                    <View style={[appStyles.flexRow,appStyles.flexWrap]}>
                        <Icon name="chevron-left" size={20} style={[appStyles.colorWhite]} />
                        <Text style={[appStyles.colorPrimary, appStyles.upperCase, appStyles.boldFont]}>
                            Back
                        </Text>
                    </View>


                </View>
            </TouchableOpacity>
        );
    }
}

export default DrawerHeader;