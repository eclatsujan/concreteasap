import React from 'react';

//Native Base components
import {Icon,Button,Text,Form,Item as FormItem,Input,Content,Row,Col} from "native-base";

//Custom Component
import AppBackground from '../../components/AppBackground';
import LoginHeader from '../../components/LoginHeader';
import ErrorHeader from '../../components/ErrorHeader';
//Redux Core
import { connect } from 'react-redux';

//States
import { actions, States } from '../../store';

//Custom Styles
import {appStyles} from '../assets/app_styles'

class ResetPasswordToken extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      password_confirmation:"",
      token:"",
    };
    this.resetPassword=this.resetPassword.bind(this);
  }

  componentDidMount(){
    let email=this.props.navigation.getParam("email");
    if(email){
      this.setState({"email":email});
    }
  }

  resetPassword(){
    // console.log(this.state.email);
    this.props.resetPassword(this.state.email,this.state.token,this.state.password,this.state.password_confirmation);
  }

  render(){
    return (
      <AppBackground loading={this.props.app.loading}>
        <Content style={[appStyles.content]}>
          <LoginHeader/>
          <ErrorHeader errorMsg={this.props.error.error_msg} />
          <Row>
              <Col>
                  <Form style={appStyles.loginForm}>
                    {!this.props.navigation.getParam("email") > 0 &&
                      <FormItem style={appStyles.loginInput} regular>
                          <Input style={[appStyles.baseFont]} placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                          <Icon active  type="FontAwesome5" name='user' />
                      </FormItem>
                    }
                    <FormItem style={appStyles.loginInput} regular>
                        <Input style={[appStyles.baseFont]} placeholder='Token' value={this.state.token} onChangeText={(text) => this.setState({ token: text })} />
                        <Icon active  type="FontAwesome5" name='shield-alt' />
                    </FormItem>
                    <FormItem style={appStyles.loginInput} regular>
                        <Input style={[appStyles.baseFont]} placeholder='Password' value={this.state.password} onChangeText={(text) => this.setState({ password: text })} />
                        <Icon active  type="FontAwesome5" name='key' />
                    </FormItem>
                    <FormItem style={appStyles.loginInput} regular>
                        <Input style={[appStyles.baseFont]} placeholder='Confirm Password' value={this.state.password_confirmation} onChangeText={(text) => this.setState({ password_confirmation: text })} />
                        <Icon active  type="FontAwesome5" name='key' />
                    </FormItem>
                  </Form>
                  <Button full style={[appStyles.button,appStyles.btnPadding]} onPress={this.resetPassword}>
                      <Text style={[appStyles.btnTxt,appStyles.baseFont]}>Reset Password</Text>
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
    resetPassword: (token,email,password,password_confirmation) => {
      return dispatch(actions.user.changePasswordWithToken(token,email,password,password_confirmation));
    },
  }
}

const mapStateToProps = (state) => {
    const {app,error}=state;
    return {app,error};
};

export default connect(mapStateToProps,mapDispatchToProps)(ResetPasswordToken);
