//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content} from 'native-base';

//App Component
import AppBackground from '../../components/AppBackground';
import AppHeader from '../../components/AppHeader'
import HomeButton from '../../components/HomeButton'

import {styles} from './styles.js';
import {appStyles} from "../assets/app_styles";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBackground alignTop>
                <ScrollView style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <Content contentContainerStyle={[appStyles.horizontalCenter]}>

                        <HomeButton onPress={() => this.props.navigation.navigate("PlaceOrderLanding")}
                                    text="Place New Order" iconName="clipboard"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("View Order Bids")}
                                    text="Pending Orders" iconName="hourglass"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("Accepted Orders")}
                                    text="Accepted Orders" iconName="running"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("Notifications")}
                                    text="Notifications" iconName="bell"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("Calculator")}
                                    text="Calculators" iconName="calculator"/>
                        <HomeButton onPress={() => this.props.navigation.navigate("FAQ")}
                                    text="faq" iconName="question"/>

                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
