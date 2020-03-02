import React from 'react';

//Native Base components
import {Icon, Button, Text, Form, Item as FormItem, Input, Content, Row, Col} from "native-base";

//Custom Component
import AppBackground from '../../components/App/AppBackground';
import LoginHeader from '../../components/Headers/LoginHeader';
import ErrorHeader from '../../components/Headers/ErrorHeader';

//Redux Core
import {connect} from 'react-redux';

//States
import {actions} from '../../store';

//Custom Styles
import {appStyles} from '../../../assets/styles/app_styles'

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.resetPassword = this.resetPassword.bind(this);
        this.showResetPassword = this.showResetPassword.bind(this);
    }

    componentDidMount() {
        this.props.flushError();
    }

    componentWillUnmount() {
        this.props.flushError();
    }

    resetPassword() {
        this.props.resetPassword(this.state.email);
    }

    showResetPassword() {
        this.props.navigation.navigate("Reset Password Token");
    }

    render() {
        let app=this.props.app;
        let error=this.props.error;
        return (
            <AppBackground loading={app.get("loading")} enableKeyBoard alignContent="center">
                <Content style={[appStyles.content]}>
                    <LoginHeader/>
                    <ErrorHeader error={error}/>
                    <Row>
                        <Col>
                            <Form style={appStyles.loginForm}>
                                <FormItem style={appStyles.loginInput} regular>
                                    <Input style={[appStyles.baseFont]} placeholder='Email' value={this.state.email}
                                           onChangeText={(text) => this.setState({email: text})}/>
                                    <Icon active type="FontAwesome" name='user'/>
                                </FormItem>
                            </Form>
                            <Button full style={[appStyles.button]} onPress={this.resetPassword}>
                                <Text style={[appStyles.btnTxt, appStyles.customFont]}>Reset Password</Text>
                            </Button>
                            <Button full style={[appStyles.button]}
                                    onPress={this.showResetPassword}>
                                <Text style={[appStyles.btnTxt, appStyles.customFont]}>Already Have Token</Text>
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
        resetPassword: (email) => {
            return dispatch(actions.user.resetPassword(email));
        },
        flushError: () => {
            return dispatch(actions.error.removeErrors());
        }
    }
};

const mapStateToProps = (state) => {
    const {app, error} = state;
    return {
        app:state.get("app"),
        error:state.get("error")
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
