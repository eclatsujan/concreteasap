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
        let iconStyle = [appStyles.headerIcon, appStyles.pr_15];
        return iconType === "ConcreteASAP" ? <ConcreteIcon name={iconName} style={iconStyle}/> :
            <Icon active type={iconType} name={iconName} style={iconStyle}/>;
    }

    render() {
        let iconType = this.props["iconType"] ? this.props["iconType"] : "FontAwesome5";
        let iconName = this.props["iconName"];
        return (
            <View style={{paddingTop: 30, height: 125, position: "relative"}}>
                <Svg height="100%" width="100%">
                    <Polygon width="100%" fill-rule="evenodd" clip-rule="evenodd" fill="#14E22A" fill-opacity="0.9961"
                             points="410.25,64.436 0.25,80 0.25,0   410.25,0 "/>
                </Svg>
                <View style={[appStyles.absoluteCenter, appStyles.verticalCenter]}>
                    <Row style={[appStyles.bgPrimary, appStyles.subHeader]}>
                        <Col style={[appStyles.w_25,{alignItems:"center"}]}>
                            {this.renderIcon(iconType, iconName)}
                        </Col>
                        <Col style={[appStyles.subHeaderTxtCol,appStyles.w_75]}>
                            <Text
                                style={[appStyles.baseFont, appStyles.subHeaderTxt, appStyles.upperCase]}>
                                {this.props.title}
                            </Text>
                        </Col>
                    </Row>
                </View>
            </View>
        );
    }
}
