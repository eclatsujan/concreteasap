//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content} from 'native-base';

//App Component
import AppBackground from '../../../components/App/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import HomeButton from '../../../components/Basic/Button/HomeButton'

import {appStyles} from "../../../../assets/styles/app_styles";

import OneSignal from "react-native-onesignal";
import {withNavigation} from "react-navigation";
import navigationHelper, {resetNavigation} from "../../../helpers/navigationHelper";
import {actions} from "../../../store/modules";
import connect from "react-redux/lib/connect/connect";
import SubHeader from "../../../components/Headers/SubHeader";

class ReoHome extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <AppBackground disableBack alignTop>
                <ScrollView contentContainerStyle={[appStyles.flexGrow]} style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <Content contentContainerStyle={[appStyles.horizontalCenter, appStyles.flex1]}>
                        <SubHeader bgColor={"#30C5E1"} iconType="ConcreteASAP" iconName="mesh" title="Reo Home"/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    text="I Need REO"
                                    iconType="ConcreteASAP" iconName="place-order"
                                    onPress={() => {
                                        this.props.navigation.navigate("I Need Reo");
                                    }}/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    text={"Today's Orders"} iconSize={25}
                                    paddingBtn={true} iconType={"ConcreteASAP"}
                                    iconName={"mesh"}
                                    onPress={() => {
                                        // this.props.navigation.navigate("pourDayList");
                                        // this.props.appLoading();
                                    }}/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    text="Pending Orders" iconType="ConcreteASAP" iconName="pending-order"
                                    onPress={() => {
                                        // resetNavigation("ViewOrderBids", "Pending Orders");
                                        // this.props.appLoading();
                                    }}/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    text="Accepted Orders"
                                    iconType="ConcreteASAP" iconName="accepted-order"
                                    onPress={() => {
                                        // this.props.navigation.navigate("Accepted Order");
                                        // // resetNavigation("Accepted Order", "Accepted Order List",1);
                                        // this.props.appLoading();
                                    }}/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    text="Previous Orders"
                                    iconType="ConcreteASAP" iconName="prev-order"
                                    onPress={() => {
                                        // resetNavigation("Previous Order List", "Previous Orders");
                                        // this.props.appLoading();
                                    }}/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    text="Notifications"
                                    iconType="ConcreteASAP" iconName="bell"
                                    onPress={() => {
                                        // this.props.navigation.navigate("Notifications");
                                        // this.props.appLoading();
                                    }}/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    text="Back To Home" iconName="home"
                                    onPress={() => {
                                        this.props.navigation.navigate("Main Home")
                                    }}/>
                        <HomeButton iconColor={"#30C5E1"} textColor={"#30C5E1"} borderColor={"#30C5E1"}
                                    onPress={() => this.props.navigation.navigate("FAQ")}
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


export default withNavigation(connect(null, mapDispatchToProps)(ReoHome));
