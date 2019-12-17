import * as React from 'react';
import {ScrollView, Alert} from 'react-native';
import {Content} from "native-base";

import AppHeader from "../../components/Headers/AppHeader";
import AppBackground from "../../components/AppBackground";
import HomeButton from "../../components/Button/HomeButton";

import {appStyles} from "../../../assets/styles/app_styles";
import {resetNavigation} from "../../helpers/navigationHelper";
import {actions} from "../../store/modules";
import {withNavigation} from "react-navigation";

import {connect} from "react-redux";
import OneSignal from "react-native-onesignal";

class RepHomeScreen extends React.Component {

    constructor(props) {
        super(props);
        OneSignal.addEventListener("inAppMessageClicked", function (event) {
            console.log(event);
        });
    }

    render() {
        return (
            <AppBackground>
                <AppHeader/>
                <Content contentContainerStyle={[appStyles.flex1, appStyles.horizontalCenter]}>
                    <ScrollView contentContainerStyle={[appStyles.flexGrow, appStyles.horizontalCenter]}>
                        <HomeButton onPress={() => {
                            resetNavigation("Pending Bid List", "My Bids");
                            this.props.appLoading();
                        }}
                                    text="My Bids" iconType="ConcreteASAP" iconName="existing-order"/>

                        <HomeButton onPress={() => {
                            resetNavigation("Bid Order List", "Order Quote Request Board");
                            this.props.appLoading();
                        }}
                                    text="Order Quote Request Board" iconType="ConcreteASAP" iconName="pending-order"/>

                        <HomeButton onPress={() => {
                            resetNavigation("Accepted Bid List", "Accepted Bids");
                            this.props.appLoading();
                        }}
                                    text="Accepted Bids" iconType="ConcreteASAP" iconName="accepted-order"/>

                        <HomeButton onPress={() => {
                            resetNavigation("Previous Bid List", "Previous Bids");
                            this.props.appLoading();
                        }}
                                    text="Previous Bids" iconType="ConcreteASAP" iconName="place-order"/>

                        <HomeButton onPress={() => {
                            this.props.navigation.navigate("Rep Notifications")
                        }} text="Notifications" iconName="bell"/>

                        <HomeButton onPress={() => this.props.navigation.navigate("FAQ")}
                                    text="FAQ" iconType="ConcreteASAP" iconName="question"/>
                    </ScrollView>
                </Content>
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


export default withNavigation(connect(null, mapDispatchToProps)(RepHomeScreen));