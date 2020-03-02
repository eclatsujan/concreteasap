import React from "react";
import {Icon, Text, View} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import ConcreteIcon from "../Fonts/ConcreteIcon";
import {normalize} from "../../../helpers/app";

export default class FieldHeader extends React.Component {

    render() {
        let txtStyle = typeof this.props.style !== "undefined" ? this.props.style : [];
        let textColor=typeof this.props.txtColor!=="undefined"?{color:this.props.txtColor}:appStyles.colorBlueLgt;
        let iconColor=typeof this.props.iconColor!=="undefined"?{color:this.props.txtColor}:appStyles.colorBlueLgt;
        let iconSize=typeof this.props.iconSize!=="undefined"?normalize(this.props.iconSize):normalize(20);
        return (
            <View style={[appStyles.flexRow,appStyles.verticalCenter]}>
                <Text
                    style={[appStyles.upperCase,textColor, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                    {this.props.title}
                </Text>
                <ConcreteIcon name={this.props.icon} style={[iconColor,appStyles.ml_10]} size={iconSize}/>
            </View>
        );
    }
}