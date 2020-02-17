//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content, View} from 'native-base';

//App Component
import AppBackground from '../../components/AppBackground';
import AppHeader from '../../components/Headers/AppHeader'
import HomeButton from '../../components/Button/HomeButton'

import {appStyles} from "../../../assets/styles/app_styles";

import {withNavigation} from "react-navigation";
import navigationHelper, {resetNavigation} from "../../helpers/navigationHelper";
import {actions} from "../../store/modules";
import connect from "react-redux/lib/connect/connect";
import SubHeader from "../../components/Headers/SubHeader";

class MainHome extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBackground disableBack>
                <ScrollView>
                    <AppHeader/>
                    <Content contentContainerStyle={[appStyles.horizontalCenter, appStyles.flex1]}>
                        <SubHeader iconType="ConcreteASAP" iconName="place-order" title="Place Order Request"/>
                        <View>
                            <HomeButton onPress={() => this.props.navigation.navigate("Home")}
                                        text="Concrete" iconType="ConcreteASAP" iconName="truck" iconSize={25}/>

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

const mapDispatchToProps = (dispatch) => {
    return {
        appLoading: () => {
            return dispatch(actions.app.loading())
        }
    }
};


export default withNavigation(connect(null, mapDispatchToProps)(MainHome));
