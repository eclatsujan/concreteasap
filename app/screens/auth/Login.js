//Core React packages
import * as React from 'react';
import {ActivityIndicator,View,ImageBackground,Dimensions,Image,StatusBar} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//Native Base
import {Icon,Container,Button,Text,Form,Item as FormItem,Input,Content,Spinner,Toast,Grid,Row,Col,Right} from "native-base";
//Redux Core
import { connect } from 'react-redux';

//Component
import AppBackground from '../../components/AppBackground';
import ErrorHeader from '../../components/ErrorHeader';
import LoginHeader from '../../components/LoginHeader';

//helpers
import * as appHelper from '../../helpers/app';

//States
import { actions, States } from '../../store';

import {styles} from './styles';
import {appStyles} from '../assets/app_styles'

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading:false,
            type:'contractor'
        };
    }

    login() {
        try {
            this.props.doLogin(this.state.email,this.state.password);
        } catch (e) {
            console.log(e);
        }
    }

    setUserType(e){
        this.setState({type:e});
    }

    forgotPassword(){
      console.log("ok");
    }

    navigate(navigate_name){

    }

    render() {
      return <AppBackground loading={this.props.app.loading} >
                <Content style={[appStyles.content]}>
                    <Grid style={{alignItems: 'center'}}>
                        <LoginHeader/>
                        <ErrorHeader error={this.props.error}/>
                        <Row>
                            <Col>
                                <Form style={appStyles.loginForm}>
                                    <FormItem style={appStyles.loginInput} regular>
                                        <Input style={[appStyles.baseFont]} placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                                        <Icon active  type="FontAwesome" name='user' />
                                    </FormItem>
                                    <FormItem style={appStyles.loginInput} regular>
                                        <Input style={[appStyles.baseFont]} placeholder='••••••••' value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                                        <Icon active type="FontAwesome5" name='key' />
                                    </FormItem>
                                    <FormItem style={appStyles.borderTransparent} regular>
                                        <Right>
                                          <Text style={[appStyles.baseFont,appStyles.colorPrimary]} onPress={()=>this.props.navigation.navigate('Forget Password')}>FORGOT PASSWORD</Text>
                                        </Right>
                                    </FormItem>
                                    <Button full style={[appStyles.button,appStyles.btnPadding]} onPress={()=> this.login()}>
                                        <Text style={[appStyles.btnTxt,appStyles.baseFont]}>Continue</Text>
                                    </Button>
                                    <Button full transparent onPress={()=> this.props.navigation.navigate('Register')}>
                                        <Text style={[appStyles.btnLargeTxt,appStyles.txtCenter]}>New User</Text>
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </AppBackground>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (username,password) => {
            return dispatch(actions.user.login(username,password));
        }
    }
};

const mapStateToProps = (state) => {
    const {user,app,error}=state;
    return {user,app,error};
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);
