import * as React from 'react';
import {ScrollView,BackHandler,Platform} from 'react-native';
import {View, Content, Footer, FooterTab, Button, Text} from 'native-base';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
import {resetNavigation} from "../../../helpers/navigationHelper";
import {actions} from "../../../store/modules";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        const {params} = this.props.navigation.state;
        const message = params ? params.message : null;
        return (
            <AppBackground>
                <AppHeader/>
                <ScrollView>
                    <SubHeader iconName="check" title="Order Requests"/>
                    <Content contentContainerStyle={styles.content}>
                        <View style={[appStyles.bgWhite, appStyles.customCard]}>
                            <Text>{message}</Text>
                        </View>
                        <Button style={[appStyles.justifyItemsCenter, appStyles.defaultMargin]}
                                onPress={() =>{
                                    this.props.appLoading();
                                    resetNavigation("ViewOrderBids","Pending Orders")
                                }}>
                            <Text style={[appStyles.colorBlack]}>View Order Requests</Text>
                        </Button>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appLoading: () => {
            return dispatch(actions.app.loading());
        }
    }
};
export default withNavigation(connect(null, mapDispatchToProps)(HomeScreen));

