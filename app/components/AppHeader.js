import React from "react";
import {Button, Icon, Left, Body, Title, Right, Header, View} from "native-base";
import navigationHelper from "../helpers/navigationHelper";
import {Image} from "react-native";
import {appStyles} from "../screens/assets/app_styles";
import { StatusBar } from 'react-native'

export default class AppHeader extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Header transparent>
                <Left style={appStyles.flex1}>
                    <Button transparent onPress={() => navigationHelper.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body style={[appStyles.justifyItemsCenter,appStyles.flex3]}>
                    <View>
                        <Image source={require("../../assets/Logo18.png")} style={appStyles.logoHeader} />
                    </View>
                </Body>
                <Right style={appStyles.flex1}>
                    <Button transparent>
                        <Icon name='person' />
                    </Button>
                </Right>
            </Header>
        );
    }
}