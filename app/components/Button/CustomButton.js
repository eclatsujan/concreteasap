import React from "react";
import {View, TouchableWithoutFeedback} from "react-native";
import {Button, Text} from 'native-base';

import {appStyles} from "../../../assets/styles/app_styles";

export default class CustomButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){

        return (
            <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                    onPress={this.props?.onPress}>
                <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                    {this.props["btnText"]}
                </Text>
            </Button>
        );
    }
}