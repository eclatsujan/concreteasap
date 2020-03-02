import * as React from 'react';
import {Button, Text, Form, Row, Col} from "native-base";
import {ScrollView,View} from 'react-native';
//Custom Component
import AppBackground from '../../components/App/AppBackground';
import LoginHeader from '../../components/Headers/LoginHeader';

import {appStyles} from '../../../assets/styles/app_styles';
import AppFooter from "../../components/App/Footer/AppFooter";

export default class RegisterLanding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <AppBackground alignContent="center" enableKeyBoard>
                <ScrollView keyboardShouldPersistTaps={"always"}>
                    <LoginHeader/>
                    <Row style={[appStyles.marginAppDefault]}>
                        <Col>
                            <Form>
                                <Button full style={[appStyles.button, appStyles.marginDefault]}
                                        onPress={() => this.props.navigation.navigate('Register', {
                                            "roles": "contractor",
                                            "title": "Register as Contractor"
                                        })}>
                                    <Text style={[appStyles.btnTxt,appStyles.upperCase]}>Register as Contractor</Text>
                                </Button>
                                <Button full style={[appStyles.button, appStyles.marginDefault]}
                                        onPress={() => this.props.navigation.navigate('Register', {
                                            "roles": "rep",
                                            "title": "Register as Concrete Rep"
                                        })}>
                                    <Text style={[appStyles.btnTxt,appStyles.upperCase]}>Register as Concrete Rep</Text>
                                </Button>
                                <Button full style={[appStyles.button, appStyles.marginDefault,appStyles.bgBluelgt]}
                                        onPress={() => this.props.navigation.navigate('Register', {
                                            "roles": "reo_rep",
                                            "title": "Register as REO Rep"
                                        })}>
                                    <Text style={[appStyles.btnTxt,appStyles.upperCase]}>Register as REO Rep</Text>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </ScrollView>
            </AppBackground>
        );
    }
}
