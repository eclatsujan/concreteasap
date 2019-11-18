import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from "native-base";

import AppHeader from "../../components/Headers/AppHeader";
import AppBackground from "../../components/AppBackground";
import HomeButton from "../../components/Button/HomeButton";

import {appStyles} from "../../../assets/styles/app_styles";

export default class RepHomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBackground>
                <AppHeader/>
                <Content contentContainerStyle={[appStyles.flex1, appStyles.horizontalCenter]}>
                    <ScrollView contentContainerStyle={[appStyles.flexGrow,appStyles.horizontalCenter]}>
                        <HomeButton onPress={() => this.props.navigation.navigate("Pending Rep Orders")}
                                    text="My Bids" iconType="ConcreteASAP" iconName="existing-order"/>

                        <HomeButton onPress={() => this.props.navigation.navigate("View Bids")}
                                    text="Order Quote Request Board" iconType="ConcreteASAP" iconName="pending-order"/>

                        <HomeButton onPress={() => this.props.navigation.navigate("Current Orders")}
                                    text="Accepted Bids" iconType="ConcreteASAP" iconName="accepted-order"/>

                        <HomeButton onPress={() => this.props.navigation.navigate("Past Orders")}
                                    text="Open Orders" iconType="ConcreteASAP" iconName="place-order"/>

                        <HomeButton onPress={() => this.props.navigation.navigate("Rep Notifications")}
                                    text="Notifications" iconName="bell"/>

                        <HomeButton onPress={() => this.props.navigation.navigate("FAQ")}
                                    text="FAQ" iconType="ConcreteASAP" iconName="question"/>
                    </ScrollView>
                </Content>
            </AppBackground>
        );
    }
}
