import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Icon, Text,Button} from 'native-base';


import ConcreteIcon from "../Fonts/ConcreteIcon";

import {appStyles} from "../../../assets/styles/app_styles";

export default class HomeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    displayIcon(iconType, iconName) {
        return iconType === "ConcreteASAP" ? <ConcreteIcon name={iconName} style={appStyles.buttonHomeIcon}/> :
            <Icon active type={iconType} name={iconName} style={appStyles.buttonHomeIcon}/>;
    }

    render() {
        let iconType = this.props["iconType"] ? this.props["iconType"] : "FontAwesome5";
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View>
                    <View
                        style={[appStyles.button, appStyles.buttonSecondary, appStyles.py_15, appStyles.flexRow]}>
                        <View style={[appStyles.w_35, appStyles.verticalCenter]}>
                            <View style={[appStyles.circle, appStyles.flexRow, appStyles.flexCenter]}>
                                {this.displayIcon(iconType, this.props.iconName)}
                            </View>
                        </View>
                        <View style={[appStyles.w_65, appStyles.flexRow, appStyles.verticalCenter]}>
                            <Text style={[appStyles.buttonHomeTxt,appStyles.baseFontSize]}>{this.props.text}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
