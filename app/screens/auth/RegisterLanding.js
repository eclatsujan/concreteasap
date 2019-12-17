import * as React from 'react';
import {Button, Text, Form, Content, Row, Col} from "native-base";

//Custom Component
import AppBackground from '../../components/AppBackground';
import LoginHeader from '../../components/Headers/LoginHeader';

import {appStyles} from '../../../assets/styles/app_styles';

export default class RegisterLanding extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <AppBackground contentContainerStyle={[appStyles.horizontalCenter]} alignContent="center">
                <Content>
                    <LoginHeader/>
                    <Row style={[appStyles.marginAppDefault]}>
                        <Col>
                            <Form>
                                <Button full style={[appStyles.button, appStyles.marginDefault]}
                                        onPress={() => this.props.navigation.navigate('Register', {
                                            "roles": "contractor",
                                            "title": "Register as Contractor"
                                        })}>
                                    <Text style={appStyles.btnTxt}>Register as Contractor</Text>
                                </Button>
                                <Button full style={[appStyles.button, appStyles.marginDefault]}
                                        onPress={() => this.props.navigation.navigate('Register', {
                                            "roles": "rep",
                                            "title": "Register as Rep"
                                        })}>
                                    <Text style={appStyles.btnTxt}>Register as Rep</Text>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </AppBackground>
        );
    }
}
