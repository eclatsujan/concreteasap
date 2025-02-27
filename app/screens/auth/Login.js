//Core React packages
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Icon, Button, Text, Form, Item as FormItem, Input, Content, Row, Col, Right, View} from "native-base";
//Redux Core
import {connect} from 'react-redux';

//Component
import AppBackground from '../../components/App/AppBackground';
import ErrorHeader from '../../components/Headers/ErrorHeader';
import LoginHeader from '../../components/Headers/LoginHeader';

//States
import {actions} from '../../store';

import {appStyles} from "../../../assets/styles/app_styles";
import {withNavigation} from "react-navigation";

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: true,
            type: 'contractor'
        };
    }

    componentDidMount() {
        this.setState({isLoading: false});
    }

    componentWillUnmount() {
        this.props.flushError();
    }

    login() {
        try {
            this.setState({isLoading: true});
            this.props.doLogin(this.state.email, this.state.password);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let app = this.props.app;
        let error = this.props.error;
        return (<AppBackground loading={app.get("loading")} enableKeyBoard alignContent={"center"} disableBack>
            <ScrollView keyboardShouldPersistTaps={"always"}>
                <LoginHeader/>
                <ErrorHeader error={error}/>
                <View>
                    <Row style={[{fontSize: 56}]}>
                        <Col>
                            <Form style={appStyles.loginForm}>
                                <FormItem style={appStyles.loginInput} regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Email' value={this.state.email}
                                           autoCapitalize='none'
                                           onChangeText={(text) => this.setState({email: text})}/>
                                    <Icon active type="FontAwesome" name='user'/>
                                </FormItem>
                                <FormItem style={appStyles.loginInput} regular>
                                    <Input style={[appStyles.baseFont]} placeholder='••••••••'
                                           value={this.state.password}
                                           secureTextEntry={true}
                                           autoCapitalize='none'
                                           onChangeText={(text) => this.setState({password: text})}/>
                                    <Icon active type="FontAwesome5" name='key'/>
                                </FormItem>
                                <FormItem style={appStyles.borderTransparent} regular>
                                    <Right>
                                        <Text style={[appStyles.customFont, appStyles.colorPrimary]}
                                              onPress={() => this.props.navigation.navigate('Forget Password')}>FORGOT
                                            PASSWORD</Text>
                                    </Right>
                                </FormItem>
                                <Button full style={[appStyles.marginDefault]} onPress={() => this.login()}>
                                    <Text style={[appStyles.btnLargeTxt, appStyles.colorBlack]}>Continue</Text>
                                </Button>
                                <Button full transparent
                                        onPress={() => this.props.navigation.navigate('Register Landing')}>
                                    <Text style={[appStyles.btnLargeTxt, appStyles.txtCenter]}>New User</Text>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </View>
            </ScrollView>
        </AppBackground>)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (username, password) => {
            return dispatch(actions.user.login(username, password));
        },
        flushError: () => {
            return dispatch(actions.error.removeErrors());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
        app: state.get("app"),
        error: state.get("error")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));
