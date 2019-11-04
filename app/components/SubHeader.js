/*
    This component is responsible to display sub header for customize polygon .
    User can pass different icon name and type to display the icon and title
*/

import React from "react";
import {Image, StatusBar, ScrollView, Animated, Platform, View, StyleSheet} from "react-native";
import {Row, Col, Icon, Text} from 'native-base';
import Svg, {Polygon} from 'react-native-svg';
import {appStyles} from "../screens/assets/app_styles";


export default class SubHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{paddingTop: 30, height: 125, position: "relative"}}>
                <Svg height="100%" width="100%">
                    <Polygon width="100%" fill-rule="evenodd" clip-rule="evenodd" fill="#59BA47" fill-opacity="0.9961"
                             points="410.25,64.436 0.25,80 0.25,0   410.25,0 "/>
                </Svg>
                <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Row style={[appStyles.bgPrimary, appStyles.subHeader]}>
                        <View style={appStyles.subHeaderBg}/>
                        <Col style={appStyles.iconCol}>
                            <Icon type={this.props["iconType"] ? this.props["iconType"] : "FontAwesome5"}
                                  name={this.props["iconName"]} style={appStyles.headerIcon}/>
                        </Col>
                        <Col style={appStyles.subHeaderTxtCol}>
                            <Text style={[appStyles.baseFont, appStyles.subHeaderTxt]}>{this.props.title}</Text>
                        </Col>
                    </Row>
                </View>
            </View>
        );
    }
}
