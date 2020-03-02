import * as React from 'react';
import {ScrollView, Alert} from 'react-native';
import {Content} from "native-base";

import AppHeader from "../../components/Headers/AppHeader";
import AppBackground from "../../components/App/AppBackground";
import HomeButton from "../../components/Basic/Button/HomeButton";

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
            // console.log(event);
        });

    }

    render() {
        return (
            <AppBackground disableBack>
                <AppHeader/>
                <Content contentContainerStyle={[appStyles.flex1, appStyles.horizontalCenter]}>
                    <ScrollView contentContainerStyle={[appStyles.flexGrow, appStyles.horizontalCenter]}>

                        <HomeButton text="Concrete Jobs for Tender" iconType="ConcreteASAP" iconName="pending-order"
                                    onPress={() => {
                                        resetNavigation("Bid Order List","Concrete Jobs for Tender");
                                        this.props.appLoading();
                                    }}/>

                        <HomeButton text="My Bids" iconType="ConcreteASAP" iconName="existing-order"
                                    onPress={() => {
                                        resetNavigation("Pending Bid List", "My Bids");
                                        this.props.appLoading();
                                    }}/>

                        <HomeButton text="Jobs Won" iconType="ConcreteASAP" iconName="accepted-order"
                                    onPress={() => {
                                        resetNavigation("Accepted Bid List", "Jobs Won");
                                        this.props.appLoading();
                                    }}/>

                        <HomeButton text="Previous Bids" iconType="ConcreteASAP" iconName="place-order"
                                    onPress={() => {
                                        resetNavigation("Previous Bid List", "Previous Bids");
                                        this.props.appLoading();
                                    }}/>

                        <HomeButton onPress={() => {
                            this.props.navigation.navigate("Rep Notifications");
                            this.props.appLoading();
                        }}
                                    text="Notifications" iconName="bell"/>

                        <HomeButton onPress={() => this.props.navigation.navigate("FAQ")} text="FAQ"
                                    iconType="ConcreteASAP" iconName="question"/>
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