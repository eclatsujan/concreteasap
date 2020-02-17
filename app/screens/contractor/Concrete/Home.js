//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content} from 'native-base';

//App Component
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import HomeButton from '../../../components/Button/HomeButton'

import {appStyles} from "../../../../assets/styles/app_styles";

import OneSignal from "react-native-onesignal";
import {withNavigation} from "react-navigation";
import navigationHelper, {resetNavigation} from "../../../helpers/navigationHelper";
import {actions} from "../../../store/modules";
import connect from "react-redux/lib/connect/connect";
import SubHeader from "../../../components/Headers/SubHeader";

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        this.onOpened = this.onOpened.bind(this);
    }

    onOpened(event) {
        const {action, notification} = event;
        if (action["actionID"] !== "__DEFAULT__") {
            let payload = notification["payload"];
            let params = payload["additionalData"]["params"] ? payload["additionalData"]["params"] : null;
            navigationHelper.navigate(payload["additionalData"]["route"], params);
        }
    }

    onInAppClicked(action) {
        let {clickUrl, clickName, firstClick, closesMessage} = action;
    }

    componentWillUnmount() {
        OneSignal.removeEventListener("received");
        OneSignal.removeEventListener("inAppMessageClicked");
    }

    render() {
        return (
            <AppBackground disableBack alignTop>
                <ScrollView contentContainerStyle={[appStyles.flexGrow]} style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <Content contentContainerStyle={[appStyles.horizontalCenter, appStyles.flex1]}>
                        <SubHeader iconType="ConcreteASAP" iconName="truck" title="Concrete Home"/>

                        <HomeButton text="I Need Concrete" iconType="ConcreteASAP" iconName="place-order"
                                    onPress={() => {
                                        resetNavigation("Place Order Requests",null);
                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text={"Today's Orders"} iconSize={20} paddingBtn={true} iconType={"ConcreteASAP"}
                                    iconName={"truck"}
                                    onPress={() => {
                                        this.props.navigation.navigate("pourDayList");

                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text="Pending Orders" iconType="ConcreteASAP" iconName="pending-order"
                                    onPress={() => {
                                        resetNavigation("ViewOrderBids", "Pending Orders");
                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text="Accepted Orders" iconType="ConcreteASAP" iconName="accepted-order"
                                    onPress={() => {
                                        this.props.navigation.navigate("Accepted Order");
                                        // resetNavigation("Accepted Order", "Accepted Order List",1);
                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text="Previous Orders" iconType="ConcreteASAP" iconName="prev-order"
                                    onPress={() => {
                                        resetNavigation("Previous Order List", "Previous Orders");
                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text="Notifications" iconType="ConcreteASAP" iconName="bell"
                                    onPress={() => {
                                        this.props.navigation.navigate("Notifications");
                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text="Calculators" iconType="ConcreteASAP" iconName="calculators"
                                    onPress={() => {
                                        this.props.navigation.navigate("Calculator")
                                    }}/>
                        <HomeButton text="Back To Home" iconName="home"
                                    onPress={() => {
                                        this.props.navigation.navigate("Main Home")
                                    }}/>
                        <HomeButton onPress={() => this.props.navigation.navigate("FAQ")}
                                    text="faq" iconType="ConcreteASAP" iconName="question"/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appLoading: () => {
            return dispatch(actions.app.loading())
        }
    }
};


export default withNavigation(connect(null, mapDispatchToProps)(HomeScreen));
