import * as React from 'react';
import {Icon,Container,Button,Text,Form,Item as FormItem,Input,Content,Spinner,Toast,Grid,Row,Col} from "native-base";
import {ActivityIndicator,View,ImageBackground,Dimensions,Image,StatusBar} from "react-native";

import { connect } from 'react-redux';

import { actions, States } from '../../store';

import {styles} from './styles';

import {appStyles} from '../assets/app_styles'

import AppBackground from '../../components/AppBackground';

import AppLoading from '../../components/AppLoading';


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

    render() {
        let { height, width } = Dimensions.get('window');
        if(this.props.app.loading){
            return (
              <AppBackground>
                <AppLoading/>
              </AppBackground>
            );
        }
        else{
            return (
                <AppBackground>
                    <Container style={appStyles.container}>
                        <Content style={appStyles.content}>
                            <Grid style={{alignItems: 'center'}}>
                                <Row>
                                    <Col style={appStyles.contentCenter}>
                                        <Image source={require("../assets/Logo18.png")} style={appStyles.logo} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form style={appStyles.loginForm}>
                                            <FormItem style={appStyles.loginInput} regular>
                                                <Input style={[appStyles.baseFont]} placeholder='Username' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                                                <Icon active  type="FontAwesome" name='user' />
                                            </FormItem>
                                            <FormItem style={appStyles.loginInput} regular>
                                                <Input style={[appStyles.baseFont]} placeholder='••••••••' value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                                                <Icon active type="FontAwesome" name='key' />
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
                    </Container>
                </AppBackground>
            );
        }
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
    const {user,app}=state;
    return {user,app};
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);
