import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Content, Footer, FooterTab, Button, Text} from 'native-base';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";


export default class HomeScreen extends React.Component {
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
                    <SubHeader iconName="check" title="View Order Requests"/>
                    <Content contentContainerStyle={styles.content}>
                        <View style={[appStyles.bgWhite, appStyles.customCard]}>
                            <Text>{message}</Text>
                        </View>
                        <Button style={[appStyles.justifyItemsCenter, appStyles.defaultMargin]}
                                onPress={() => this.props.navigation.navigate("Pending Order")}>
                            <Text style={[appStyles.colorBlack]}>View Order Requests</Text>
                        </Button>
                        <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                                onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={appStyles.colorBlack}>Back To Home</Text>
                        </Button>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

