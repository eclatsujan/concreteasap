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
import {withNavigation} from "react-navigation";
import navigationHelper, {resetNavigation} from "../../helpers/navigationHelper";
import {actions} from "../../store/modules";
import connect from "react-redux/lib/connect/connect";

class HomeScreen extends React.Component {

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

    onInAppClicked(action) {
        let {clickUrl, clickName, firstClick, closesMessage} = action;
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
                        <HomeButton text="Place New Order" iconType="ConcreteASAP" iconName="place-order"
                                    onPress={() => {
                                        resetNavigation("PlaceOrderLanding");
                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text="View Order Requests" iconType="ConcreteASAP" iconName="pending-order"
                                    onPress={() => {
                                        resetNavigation("ViewOrderBids", "Pending Order");
                                        this.props.appLoading();
                                    }}/>
                        <HomeButton text="Accepted Orders" iconType="ConcreteASAP" iconName="accepted-order"
                                    onPress={() => {
                                        resetNavigation("AcceptedOrders", "Accepted Order");
                                        this.props.appLoading();
                                    }}/>

                        <HomeButton text="Previous Orders" iconType="ConcreteASAP" iconName="accepted-order"
                                    onPress={() => {
                                        resetNavigation("Previous Order", "Accepted Order");
                                        this.props.appLoading();
                                    }}/>

                        <HomeButton text={"Day of Pour"} iconSize={20} paddingBtn={true} iconType={"ConcreteASAP"}
                                    iconName={"truck"}
                                    onPress={() => {
                                        resetNavigation("pourDayList", "Day of Pour");
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
