import React from 'react';

//Native Base components
import {Icon, Button, Text, Form, Item as FormItem, Input, Content, Row, Col} from "native-base";

//Redux Core
import {connect} from 'react-redux';

//States
import {actions, States} from '../../store';

//Custom Component
import AppBackground from '../../components/AppBackground';
import LoginHeader from '../../components/LoginHeader';
import ErrorHeader from '../../components/ErrorHeader';

//React Helper
import {helper} from '../../helpers'

//Custom Styles
import {appStyles} from '../assets/app_styles'

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
        // this.props.flushError();
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
        let error=this.props.error.toJS();
        let app=this.props.app.toJS();
        return (
            <AppBackground loading={app.loading} alignContent="center" enableKeyBoard>
                <Content style={[appStyles.content]}>
                    <LoginHeader/>
                    <ErrorHeader error={this.props.error}/>
                    <Row>
                        <Col>
                            <Form style={appStyles.loginForm}>
                                {!this.props.navigation.getParam("email") > 0 &&
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["email"])]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Email' value={this.state.email}
                                           onChangeText={(text) => this.setState({email: text})}/>
                                    <Icon active type="FontAwesome5" name='user'/>
                                </FormItem>
                                }
                                {helper.error.showErrorMessage(error.errors["email"])}
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["token"])]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Token' value={this.state.token}
                                           onChangeText={(text) => this.setState({token: text})}/>
                                    <Icon active type="FontAwesome5" name='shield-alt'/>
                                </FormItem>
                                {helper.error.showErrorMessage(error.errors["token"])}
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["password"])]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Password'
                                           value={this.state.password}
                                           onChangeText={(text) => this.setState({password: text})}/>
                                    <Icon active type="FontAwesome5" name='key'/>
                                </FormItem>
                                {helper.error.showErrorMessage(error.errors["password"])}
                                <FormItem
                                    style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["password_confirmation"])]}
                                    regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Confirm Password'
                                           value={this.state.password_confirmation}
                                           onChangeText={(text) => this.setState({password_confirmation: text})}/>
                                    <Icon active type="FontAwesome5" name='key'/>
                                </FormItem>
                                {helper.error.showErrorMessage(error.errors["password_confirmation"])}
                            </Form>
                            <Button full style={[appStyles.button, appStyles.btnPadding]} onPress={this.resetPassword}>
                                <Text style={[appStyles.btnTxt, appStyles.baseFont]}>Reset Password</Text>
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
        resetPassword: (token, email, password, password_confirmation) => {
            return dispatch(actions.user.changePasswordWithToken(token, email, password, password_confirmation));
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordToken);
