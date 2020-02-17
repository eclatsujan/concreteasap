import React from "react";

import {ImageBackground, Dimensions, SafeAreaView, Platform, StatusBar, View, Keyboard} from "react-native";

import {Container} from "native-base";
import mitt from 'mitt'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//Custom Component
import AppLoading from './AppLoading';

//helpers
import {appStyles} from "../../assets/styles/app_styles";
import AppFooter from "./Footer/AppFooter";
import navigationHelper from "../helpers/navigationHelper";
import OneSignal from "react-native-onesignal";
import {connect} from "react-redux";


const emitter = mitt();

class AppBackground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // console.log(OneSignal.);
        OneSignal.addEventListener("received",(e)=>{
            console.log(e);
        });
        OneSignal.addEventListener("opened",(e)=>{
            if(e.action.type===1){
                let notification=e?.notification?.payload?.additionalData;

                if(typeof notification!=="undefined"&&notification?.hasOwnProperty("route")){
                    let params=notification.hasOwnProperty("params")?notification?.params:{};
                    navigationHelper.navigate(notification?.route,params);
                }
            }
        });
        OneSignal.addEventListener("inAppMessageClicked",(e)=>{
            // console.log("ok");
        });

    }

    _onButtonClick() {
        Keyboard.dismiss()
    }

    renderIOS() {
        return (<SafeAreaView>
            {this.renderView()}
        </SafeAreaView>);
    }

    backPress() {
        if (typeof this.props["backBtnClick"] !== "undefined") {
            this.props["backBtnClick"]();
        } else {
            navigationHelper.goBack();
        }
    }

    renderView() {
        let alignContent = this.props.alignContent ? this.props.alignContent : "flex-start";
        let keyBoardStyles = [appStyles.flexRow, {alignItems: alignContent}];
        let containerStyle = this.props.alignContent === "center" ? [appStyles.appMargin, appStyles.flexRow, appStyles.verticalCenter] : [appStyles.appMargin];

        if (this.props["enableKeyBoard"]) {
            return (
                <View style={{flex: 1}}>
                    <KeyboardAwareScrollView contentContainerStyle={containerStyle} enableOnAndroid={true}
                                             keyboardShouldPersistTaps={'always'}
                                             keyboardDismissMode='interactive'>
                        {this.props.children}
                    </KeyboardAwareScrollView>
                    {!!this.props.disableBack ? null : <View style={appStyles.appMargin}>
                        <AppFooter btnBackPress={() => this.backPress()}/>
                    </View>}
                </View>
            );
        } else {
            return (
                <Container style={containerStyle}>
                    {this.props.children}
                    {!!this.props.disableBack ? null : <View>
                        <AppFooter btnBackPress={() => this.backPress()}/>
                    </View>}
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
        let paddingBottom = (Platform["OS"] === "ios") ? 5 : 5;
        return (
            <View>
                <ImageBackground source={require("../../assets/concrete-background.png")}
                                 style={[{width: "100%", height: "100%", paddingTop, paddingBottom}, this.getStyle()]}>
                    {this.checkLoading()}
                </ImageBackground>
            </View>
        );
    }

}

const mapDispatchToProps = (dispatch) => {

};

const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps,mapStateToProps)(AppBackground);

