import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Content} from 'native-base';

//Styles
import {appStyles} from "../../assets/app_styles";

//App Component
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import HomeButton from '../../../components/Button/HomeButton'
import SubHeader from '../../../components/Headers/SubHeader';


export default class PlaceOrderLanding extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <AppBackground>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="place-order" title="Place Order Request"/>
                <ScrollView>
                    <Content contentContainerStyle={[appStyles.horizontalCenter, appStyles.flex1]}>
                        <View>
                            <HomeButton onPress={() => this.props.navigation.navigate("PlaceOrderRequest")}
                                        text="Concrete" iconType="ConcreteASAP" iconName="place-order"/>

                            <HomeButton onPress={() => alert("Coming Soon")}
                                        text="Reo" textColor={"#30C5E1"} bgColor={"#4E4E4E"} borderColor={"#30C5E1"}
                                        iconType="ConcreteASAP" iconName="mesh" iconColor={"#30C5E1"}/>

                            <HomeButton onPress={() => alert("Coming Soon")} text="Pumps Coming Soon"
                                        textColor={"#FFF"} bgColor={"#2E2E2E"} borderColor={"#8E8F8E"}
                                        iconType="ConcreteASAP" iconName="pump" iconColor={"#8E8F8E"}/>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
