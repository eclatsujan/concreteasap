import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Content,Footer, FooterTab, Button, Text} from 'native-base';

// Custom Component
import AppBackground from '../../../../components/AppBackground'
import AppHeader from '../../../../components/AppHeader'
import SubHeader from '../../../../components/SubHeader'

//styles
import {styles} from '../../styles.js';
import {appStyles} from "../../../assets/app_styles";


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
                <SubHeader iconName="check" title="View Order Requests">
                </SubHeader>
                <Content contentContainerStyle={styles.content}>
                    <ScrollView>
                        <View style={[appStyles.bgWhite, appStyles.p_5]}>
                            <Text>{message}</Text>
                        </View>
                        <Button style={appStyles.margin_3}
                                onPress={() => this.props.navigation.navigate("Pending Order")}>
                            <Text style={appStyles.colorBlack}>View Order Requests</Text>
                        </Button>
                    </ScrollView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button style={[appStyles.button, appStyles.buttonPrimary]}
                                onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={appStyles.colorBlack}>Back To Home</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </AppBackground>
        );
    }
}

