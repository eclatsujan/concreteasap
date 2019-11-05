import * as React from 'react';
import {View,Content} from 'native-base';
import {appStyles} from "../../../assets/app_styles";

//App Component
import AppBackground from '../../../../components/AppBackground';
import AppHeader from '../../../../components/Headers/AppHeader'
import HomeButton from '../../../../components/Button/HomeButton'
import SubHeader from '../../../../components/Headers/SubHeader';


export default class PlaceOrderLanding extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <AppBackground>
                <AppHeader/>
                <SubHeader iconName="clipboard" title="Place Order Request"/>
                <Content>
                    <View>
                        <HomeButton onPress={() => this.props.navigation.navigate("PlaceOrderRequest")}
                                    text="Concrete" iconName="user"/>
                        <HomeButton onPress={() => alert("Coming Soon")}
                                    text="Reo" iconName="user"/>
                        <HomeButton onPress={() => alert("Coming Soon")}
                                    text="Pumps Coming Soon" iconName="user"/>
                    </View>
                </Content>
            </AppBackground>
        );
    }
}
