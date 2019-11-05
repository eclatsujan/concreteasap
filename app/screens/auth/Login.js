//Core React packages
import * as React from 'react';
//Native Base
import {Icon,Button,Text,Form,Item as FormItem,Input,Content,Row,Col,Right} from "native-base";
//Redux Core
import {connect} from 'react-redux';

//Component
import AppBackground from '../../components/AppBackground';
import ErrorHeader from '../../components/Headers/ErrorHeader';
import LoginHeader from '../../components/Headers/LoginHeader';

//States
import {actions, States} from '../../store';

import {appStyles} from '../assets/app_styles'
import {withNavigation} from "react-navigation";

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: true,
            type: 'contractor'
        };
    }

    login() {
        try {
            this.setState({isLoading:true});
            this.props.doLogin(this.state.email, this.state.password);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let app=this.props.app.toJS();
        let error=this.props.error.toJS();
        // this.renderButton(app.loading);
        return (<AppBackground loading={app.loading} enableKeyBoard alignContent="center">
            <Content>
                <LoginHeader/>
                <ErrorHeader error={error}/>
                <Row style={{ fontFamily: 'open-sans-bold', fontSize: 56 }}>
                    <Col>
                        <Form style={appStyles.loginForm}>
                            <FormItem style={appStyles.loginInput} regular>
                                <Input style={{fontFamily: "Hancock"}} placeholder='Email' value={this.state.email}
                                       onChangeText={(text) => this.setState({email: text})}/>
                                <Icon active type="FontAwesome" name='user'/>
                            </FormItem>
                            <FormItem style={appStyles.loginInput} regular>
                                <Input style={[appStyles.baseFont]} placeholder='••••••••' value={this.state.password}
                                       secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                                <Icon active type="FontAwesome5" name='key'/>
                            </FormItem>
                            <FormItem style={appStyles.borderTransparent} regular>
                                <Right>
                                    <Text style={[appStyles.baseFont, appStyles.colorPrimary]}
                                          onPress={() => this.props.navigation.navigate('Forget Password')}>FORGOT
                                        PASSWORD</Text>
                                </Right>
                            </FormItem>
                            <Button full style={[appStyles.button, appStyles.btnPadding]} onPress={() => this.login()}>
                                <Text style={[appStyles.btnTxt, appStyles.baseFont]}>Continue</Text>
                            </Button>
                            <Button full transparent onPress={() => this.props.navigation.navigate('Register Landing')}>
                                <Text style={[appStyles.btnLargeTxt, appStyles.txtCenter]}>New User</Text>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Content>
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
