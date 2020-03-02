import React from "react";
import {View, TouchableWithoutFeedback} from "react-native";
import {Button, Text,Icon} from 'native-base';

import {appStyles} from "../../../../assets/styles/app_styles";
import {isDefined} from "../../../helpers/app";

export default class CustomButton extends React.Component {
    constructor(props) {
        super(props);
    }

    displayIcon(btnIcon,btnColor){
        let style=[{color:"#000",fontSize:15}];
        return (
            <Icon type="FontAwesome" name={btnIcon} style={style} />
        );
    }

    render(){
        const {btnText,btnIcon,btnColor,mainBtnColor,...props}=this.props;
        let btn_color=isDefined(mainBtnColor)?mainBtnColor:{};
        return (
            <Button {...props} style={[btn_color,appStyles.marginDefault, appStyles.horizontalCenter]}>
                <Text style={[appStyles.colorBlack, appStyles.customFont, appStyles.boldFont]}>
                    {this.displayIcon(btnIcon,btnColor)}   {btnText}
                </Text>
            </Button>
        );
    }
}