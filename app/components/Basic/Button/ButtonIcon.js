import React from "react";
import {View, TouchableWithoutFeedback} from "react-native";
import {Icon, Text} from 'native-base';

import {appStyles} from "../../../../assets/styles/app_styles";
import {normalize} from "../../../helpers/app";

export default class ButtonIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let btnIconSize=this.props["small"]?appStyles.ft_small:appStyles.ft_20;
        btnIconSize=this.props["btnIconSize"]?{fontSize:normalize(this.props["btnIconSize"])}:btnIconSize;
        let iconColor = this.props["iconColor"] ? this.props["iconColor"] : {color:"#fff"};
        let textColor = this.props["textColor"] ? this.props["textColor"] : {color:"#fff"};
        let btnBgColor = this.props["btnBgColor"] ? {backgroundColor:this.props["btnBgColor"]}:appStyles.bgBlack;
        let iconType = this.props["iconType"] ? this.props["iconType"] : "FontAwesome5";
        let iconName = this.props["iconName"] ? this.props["iconName"] : "eye";
        let fontSize=this.props["btnSize"]?{fontSize:normalize(this.props["btnSize"])}:appStyles.baseSmallFontSize;
        return (
            <View style={[appStyles.pr_5]}>
                <TouchableWithoutFeedback onPress={this.props["onPress"]}>
                    <View
                        style={[appStyles.flexRow,appStyles.flexWrap,btnBgColor,appStyles.justifyItemsCenter,appStyles.borderRadiusDefault,appStyles.p_5]}>
                        <View style={appStyles.pr_5}>
                            <Icon type={iconType} name={iconName} style={[btnIconSize, iconColor]}/>
                        </View>
                        <View>
                            <Text style={[fontSize,appStyles.upperCase,appStyles.customFont,textColor]}>
                                {this.props["btnText"]}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
