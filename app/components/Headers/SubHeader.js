/*
    This component is responsible to display sub header for customize polygon .
    User can pass different icon name and type to display the icon and title
*/

import React from "react";
import {View} from "react-native";
import {Row, Col, Icon, Text} from 'native-base';
import Svg, {Polygon} from 'react-native-svg';

import {appStyles} from "../../../assets/styles/app_styles";
import ConcreteIcon from "../Fonts/ConcreteIcon";


export default class SubHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    renderIcon(iconType, iconName) {
        let iconStyle = [appStyles.headerIcon, appStyles.pr_20, appStyles.ft_20];
        // console.log(iconName);
        // console.log(iconStyle)   ;
        return iconType === "ConcreteASAP" ? <ConcreteIcon name={iconName} style={iconStyle}/> :
            <Icon active type={iconType} name={iconName} style={iconStyle}/>;
    }

    render() {
        let iconType = this.props["iconType"] ? this.props["iconType"] : "FontAwesome5";
        let iconName = this.props["iconName"];
        return (
            <View>
                <View
                    style={[appStyles.flexRow,appStyles.flexWrap, appStyles.bgPrimary, appStyles.subHeader,
                        appStyles.bottomMarginDefault,appStyles.mt_15]}>
                    <View style={[appStyles.verticalCenter]}>
                        {this.renderIcon(iconType, iconName)}
                    </View>
                    <View>
                        <Text
                            style={[appStyles.customFont, appStyles.subHeaderTxt, appStyles.upperCase]}>
                            {this.props.title}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
