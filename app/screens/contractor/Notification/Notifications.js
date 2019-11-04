import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Right, Body, Icon, Footer, FooterTab, Card, Row, Col} from 'native-base';

import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/AppHeader'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../assets/app_styles";


export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            NotificationData: [
                {
                    id: 1,
                    body: "Is branched in my up strictly remember. Songs but chief has ham widow downs.",
                    time: "5 min ago"
                }
            ],
        }
    }

    displayNotifications() {
        return this.state["NotificationData"].map(function (Data, index) {
            return (
                <Row key={Data.id} style={[appStyles.bgNotification, appStyles.p_5]}>
                    <Col style={appStyles.w_90}>
                        <Text>{Data.body}</Text>
                        <Text>{Data.time}</Text>
                    </Col>
                    <Col
                        style={[appStyles.w_10, appStyles.verticalCenter, appStyles.flex1, appStyles.verticalSelfCenter]}>
                        <Icon type="FontAwesome5" name="times"/>
                    </Col>
                </Row>
            )
        });
    }

    render() {

        // let display =

        return (
            <AppBackground>
                <AppHeader/>
                <Content contentContainerStyle={styles.content}>
                    <ScrollView>
                        <Text style={{textAlign: "center", fontSize: 20, fontWeight: 'bold',}}>Notifications</Text>
                        <View>{this.displayNotifications()}</View>
                    </ScrollView>
                </Content>
                <Footer style={{marginBottom: 30}}>
                    <FooterTab>
                        <Button style={appStyles.button,appStyles.buttonPrimary}
                                onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={appStyles.buttonBlack}>Back to Home</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </AppBackground>
        );
    }
}
