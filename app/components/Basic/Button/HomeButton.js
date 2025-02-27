import React from "react";
import {View, TouchableWithoutFeedback} from "react-native";
import {Icon, Text} from 'native-base';


import ConcreteIcon from "../Fonts/ConcreteIcon";

import {appStyles} from "../../../../assets/styles/app_styles";

export default class HomeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    displayIcon(iconType, iconName, iconColor,iconSize) {
        let iconStyles = [appStyles.buttonHomeIcon, {color: iconColor},iconSize];
        return iconType === "ConcreteASAP" ? <ConcreteIcon name={iconName} style={iconStyles}/> :
            <Icon active type={iconType} name={iconName} style={iconStyles}/>;
    }

    render() {
        let iconColor = this.props["iconColor"] ? this.props["iconColor"] : "#14E22A";
        let textColor = this.props["textColor"] ? this.props["textColor"] : "#14E22A";
        let iconType = this.props["iconType"] ? this.props["iconType"] : "FontAwesome5";
        let iconSize=this.props["iconSize"] ? {fontSize:this.props["iconSize"]}:null;
        let circleColor = this.props["iconColor"] ? {borderColor: this.props["iconColor"]} : {borderColor: "#14E22A"};
        let bgColor = this.props["bgColor"] ? {backgroundColor: this.props["bgColor"]} : {backgroundColor: "#2E2E2E"};
        let borderColor = this.props["borderColor"] ? {borderColor: this.props["borderColor"]} : {borderColor: "#14E22A"};
        let paddingBtn = this.props["paddingBtn"] ? {padding: 10} : null;

        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View>
                    <View
                        style={[appStyles.button, bgColor, borderColor, appStyles.border2, appStyles.py_20, appStyles.flexRow]}>
                        <View style={[appStyles.verticalCenter, appStyles.px_20]}>
                            <View style={[appStyles.circle,paddingBtn, circleColor, appStyles.flexRow, appStyles.flexCenter]}>
                                {this.displayIcon(iconType, this.props.iconName, iconColor,iconSize)}
                            </View>
                        </View>
                        <View style={[appStyles.flexRow, appStyles.verticalCenter]}>
                            <Text
                                style={[appStyles.upperCase, appStyles.baseFontSize, appStyles.customFont, {color: textColor}]}>
                                {this.props.text}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
