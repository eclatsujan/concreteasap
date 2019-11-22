import React from "react";
import {View, TouchableHighlight} from "react-native";
import {Icon, Text} from 'native-base';

import {appStyles} from "../../../assets/styles/app_styles";

export default class ButtonIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let btnFontSize=this.props["small"]?appStyles.ft_small:appStyles.ft_20;
        let iconColor = this.props["iconColor"] ? this.props["iconColor"] : {color:"#fff"};
        let textColor = this.props["textColor"] ? this.props["textColor"] : {color:"#fff"};
        let btnBgColor = this.props["btnBgColor"] ? {backgroundColor:this.props["btnBgColor"]}:appStyles.bgBlack;
        let iconType = this.props["iconType"] ? this.props["iconType"] : "FontAwesome5";
        let iconName = this.props["iconName"] ? this.props["iconName"] : "eye";
        return (
            <TouchableHighlight onPress={this.props["onPress"]}>
                <View
                    style={[appStyles.flexRow,appStyles.flexWrap,btnBgColor,appStyles.justifyItemsCenter,appStyles.borderRadiusDefault,appStyles.p_5]}>
                    <View style={appStyles.pr_5}>
                        <Icon type={iconType} name={iconName} style={[btnFontSize, iconColor]}/>
                    </View>
                    <View>
                        <Text style={[appStyles.baseSmallFontSize,appStyles.upperCase, textColor]}>{this.props["btnText"]}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
