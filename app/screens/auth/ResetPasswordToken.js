import React from 'react';

//Native Base components
import {Icon, Button, Text, Form, Item as FormItem, Input, Content, Row, Col,View} from "native-base";

//Redux Core
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
//States
import {actions, States} from '../../store';

//Custom Component
import AppBackground from '../../components/App/AppBackground';
import LoginHeader from '../../components/Headers/LoginHeader';
import ErrorHeader from '../../components/Headers/ErrorHeader';

//React Helper
import {helper} from '../../helpers'

//Custom Styles
import {appStyles} from '../../../assets/styles/app_styles'

class ResetPasswordToken extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            token: "",
        };
        this.resetPassword = this.resetPassword.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            let email = this.props.navigation.getParam("email");
            if (email) {
                this.setState({"email": email});
            }
        });
    }

    componentDidMount() {
        let email = this.props.navigation.getParam("email");
         if (email) {
            this.setState({"email": email});
        }
    }

    componentWillUnmount() {
        this.props.flushError();
    }

    resetPassword() {
        this.props.resetPassword(this.state.email, this.state.token, this.state.password, this.state.password_confirmation);
    }

    render() {
        let errors=this.props.error.get("errors");
        let app=this.props.app;
        return (
            <AppBackground loading={app.get("loading")} alignContent="center" enableKeyBoard>
                <Content style={[appStyles.content]}>
                    <LoginHeader/>
                    <ErrorHeader error={this.props.error}/>
                    <View style={[appStyles.bgWhite,appStyles.px_10,appStyles.py_10]}>
                        <Text>Please Check your email for your token.</Text>
                    </View>
                    <Row>
                        <Col>
                            <Form style={appStyles.loginForm}>
                                {!this.props.navigation.getParam("email") > 0 &&
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("email"))]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Email' value={this.state.email}
                                           onChangeText={(text) => this.setState({email: text})}/>
                                    <Icon active type="FontAwesome5" name='user'/>
                                </FormItem>
                                }
                                {helper.error.showErrorMessage(errors.get("email"))}
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("token"))]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Token' value={this.state.token}
                                           onChangeText={(text) => this.setState({token: text})}/>
                                    <Icon active type="FontAwesome5" name='shield-alt'/>
                                </FormItem>
                                {helper.error.showErrorMessage(errors.get("token"))}
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("password"))]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Password'
                                           value={this.state.password}
                                           onChangeText={(text) => this.setState({password: text})}/>
                                    <Icon active type="FontAwesome5" name='key'/>
                                </FormItem>
                                {helper.error.showErrorMessage(errors.get("password"))}
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("password_confirmation"))]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Confirm Password'
                                           value={this.state.password_confirmation}
                                           onChangeText={(text) => this.setState({password_confirmation: text})}/>
                                    <Icon active type="FontAwesome5" name='key'/>
                                </FormItem>
                                {helper.error.showErrorMessage(errors.get("password_confirmation"))}
                            </Form>
                            <Button full style={[appStyles.button]} onPress={this.resetPassword}>
                                <Text style={[appStyles.btnTxt, appStyles.customFont]}>Reset Password</Text>
                            </Button>
                        </Col>
                    </Row>
                </Content>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (email,token, password, password_confirmation) => {
            return dispatch(actions.user.changePasswordWithToken(email, token, password, password_confirmation));
        },
        flushError: () => {
            return dispatch(actions.error.removeErrors());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        error: state.get("error")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordToken));
