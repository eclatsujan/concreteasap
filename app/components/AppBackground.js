import React from "react";

import {ImageBackground, Dimensions, SafeAreaView, Platform, StatusBar, View,Keyboard} from "react-native";

import {Container} from "native-base";
import mitt from 'mitt'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//Custom Component
import AppLoading from './AppLoading';

//helpers
import {appStyles} from "../../assets/styles/app_styles";


const emitter = mitt();

export default class AppBackground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    _onButtonClick() {
        Keyboard.dismiss()
    }

    renderIOS() {
        return (<SafeAreaView>
            {this.renderView()}
        </SafeAreaView>);
    }

    renderView() {
        let alignContent = this.props.alignContent ? this.props.alignContent : "flex-start";
        let keyBoardStyles = [appStyles.flexRow, {alignItems: alignContent}];
        let containerStyle = this.props.alignContent === "center" ? [appStyles.appMargin, appStyles.flexRow, appStyles.verticalCenter] : [appStyles.appMargin];if (this.props["enableKeyBoard"]) {
            return (
                <KeyboardAwareScrollView contentContainerStyle={containerStyle} enableOnAndroid={true}
                                         keyboardShouldPersistTaps={'handled'}
                                         keyboardDismissMode='on-drag'>
                    {this.props.children}
                </KeyboardAwareScrollView>);
        } else {
            return (
                <Container style={containerStyle}>
                    {this.props.children}
                </Container>);
        }

    }

    checkLoading() {
        if (this.props.loading) {
            return (<AppLoading/>);
        } else {
            return this.showContent();
        }

    }

    showContent() {
        return this.renderView();
    }

    getStyle() {

        let style = {justifyContent: 'center'};
        if (this.props["alignTop"]) {
            style = {justifyContent: 'flex-start'};
        }

        return style;
    }

    render() {
        // let {height, width} = Dimensions.get('window');
        // height = "100%" - StatusBar.currentHeight;
        let paddingTop = (Platform["OS"] === 'ios') ? 18 : StatusBar.currentHeight - 10;
        let paddingBottom=(Platform["OS"]==="ios")?0:StatusBar.currentHeight;
        return (
            <View>
                <ImageBackground source={require("../../assets/concrete-background.png")}
                                 style={[{width:"100%",height:"100%",paddingTop,paddingBottom},this.getStyle()]}>
                    {this.checkLoading()}
                </ImageBackground>
            </View>
        );
    }

}
