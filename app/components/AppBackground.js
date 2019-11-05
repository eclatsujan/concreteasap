import React from "react";

import {ImageBackground, Dimensions, SafeAreaView, Platform, StatusBar} from "react-native";

import {Container} from "native-base";

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//Custom Component
import AppLoading from './AppLoading';

//helpers
import * as errorHelper from '../helpers/error';

import {appStyles} from "../../assets/styles/app_styles";

export default class AppBackground extends React.Component {

    constructor(props) {
        super(props);
    }

    renderIOS() {
        return (<SafeAreaView>
            {this.renderView()}
        </SafeAreaView>);
    }

    renderView() {
        let alignContent = this.props.alignContent ? this.props.alignContent : "flex-start";
        let keyBoardStyles = Platform.OS !== "ios" ? [appStyles.flexRow, {alignItems: alignContent}] : [];
        let containerStyle = this.props.alignContent === "center" ? [appStyles.appMargin, appStyles.flexRow, appStyles.verticalCenter] : [appStyles.appMargin];
        if (this.props["enableKeyBoard"]) {
            return (
                <KeyboardAwareScrollView contentContainerStyle={containerStyle} enableOnAndroid={true}
                                         keyboardShouldPersistTaps='handled'>
                    {this.props.children}
                </KeyboardAwareScrollView>);
        } else {
            return (
                <Container style={containerStyle}>
                    {this.props.children}
                </Container>);
        }

    }

    checkKeyboard() {

    }

    checkLoading() {
        if (this.props.loading) {
            return (<AppLoading/>);
        } else {
            return this.showContent();
        }
    }

    showContent() {
        return Platform.OS === "ios" ? this.renderIOS() : this.renderView();
    }

    showErrorToast() {
        if (this.props["errorToastMessage"]) {
            errorHelper.showToastMessage(this.props["errorMessage"]);
        }
    }

    getStyle() {
        let style = {justifyContent: 'center'};
        if (this.props["alignTop"]) {
            style = {justifyContent: 'flex-start'};
        }

        return style;
    }

    render() {
        let {height, width} = Dimensions.get('window');
        this.showErrorToast();
        return (
            <ImageBackground source={require("../../assets/concrete-background.png")}
                             style={[{width, height}, this.getStyle(), {paddingBottom: StatusBar.currentHeight + 20}]}>
                {this.checkLoading()}
            </ImageBackground>
        );
    }

}
