//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content,View} from 'native-base';

//App Component
import AppBackground from '../../components/AppBackground';
import AppHeader from '../../components/Headers/AppHeader'
import HomeButton from '../../components/Button/HomeButton'

import {styles} from './styles.js';
import {appStyles} from "../../../assets/styles/app_styles";

import {resetHomeNavigation} from '../../helpers/navigationHelper'
import {app} from "../../store/modules/app";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <AppBackground alignTop>
                <ScrollView contentContainerStyle={[appStyles.flexGrow]} style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <Content contentContainerStyle={[appStyles.horizontalCenter,appStyles.flex1]}>
                        <HomeButton onPress={() => this.props.navigation.navigate("PlaceOrderLanding")}
                                    text="Place New Order" iconType="ConcreteASAP" iconName="place-order"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("View Order Bids")}
                                    text="View Order Requests" iconType="ConcreteASAP" iconName="pending-order"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("Accepted Order")}
                                    text="Accepted Orders" iconType="ConcreteASAP" iconName="accepted-order"/>
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
