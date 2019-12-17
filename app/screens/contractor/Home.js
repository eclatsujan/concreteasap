//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content} from 'native-base';

//App Component
import AppBackground from '../../components/AppBackground';
import AppHeader from '../../components/Headers/AppHeader'
import HomeButton from '../../components/Button/HomeButton'

import {appStyles} from "../../../assets/styles/app_styles";

import OneSignal from "react-native-onesignal";
import {StackActions, NavigationActions} from "react-navigation";
import navigationHelper, {resetNavigation} from "../../helpers/navigationHelper";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        this.onOpened = this.onOpened.bind(this);
    }

    componentDidMount() {
        // OneSignal.sendSelfNotification({
        //
        // });
    }

    onOpened(event) {
        const {action, notification} = event;
        if (action["actionID"] !== "__DEFAULT__") {
            let payload = notification["payload"];
            let params = payload["additionalData"]["params"] ? payload["additionalData"]["params"] : null;
            navigationHelper.navigate(payload["additionalData"]["route"], params);
        }
    }

    showNotification() {

    }

    onReceived(notification) {

        // console.log(notification);
    }

    onInAppClicked(action) {
        let {clickUrl, clickName, firstClick, closesMessage} = action;
        console.log(clickUrl);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener("received");
        OneSignal.removeEventListener("inAppMessageClicked");
    }

    render() {
        return (
            <AppBackground alignTop>
                <ScrollView contentContainerStyle={[appStyles.flexGrow]} style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <Content contentContainerStyle={[appStyles.horizontalCenter, appStyles.flex1]}>
                        <HomeButton onPress={() => resetNavigation("PlaceOrderLanding")}
                                    text="Place New Order" iconType="ConcreteASAP" iconName="place-order"/>
                        <HomeButton onPress={() => resetNavigation("ViewOrderBids", "Pending Order")}
                                    text="View Order Requests" iconType="ConcreteASAP" iconName="pending-order"/>
                        <HomeButton onPress={() => resetNavigation("AcceptedOrders", "Accepted Order")}
                                    text="Accepted Orders" iconType="ConcreteASAP" iconName="accepted-order"/>
                        <HomeButton onPress={() => resetNavigation("pourDayList", "Day of Pour")}
                                    text={"Day of Pour"} iconSize={20} paddingBtn={true} iconType={"ConcreteASAP"}
                                    iconName={"truck"}/>
                        <HomeButton onPress={() => this.props.navigation.navigate("Notifications")}
                                    text="Notifications" iconType="ConcreteASAP" iconName="bell"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("Calculator")}
                                    text="Calculators" iconType="ConcreteASAP" iconName="calculators"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("FAQ")}
                                    text="faq" iconType="ConcreteASAP" iconName="question"/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
