import React from 'react';

//Native Base components
import {Icon,Button,Text,Form,Item as FormItem,Input,Content,Row,Col} from "native-base";

//Custom Component
import AppBackground from '../../components/AppBackground';
import LoginHeader from '../../components/LoginHeader';

//Redux Core
import { connect } from 'react-redux';

//States
import { actions, States } from '../../store';

//Custom Styles
import {appStyles} from '../assets/app_styles'

class ForgetPassword extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:""
    };
    this.resetPassword=this.resetPassword.bind(this);
    this.showResetPassword=this.showResetPassword.bind(this);
  }

  resetPassword(){
    this.props.resetPassword(this.state.email);
  }

  showResetPassword(){
    this.props.navigation.navigate("Reset Password Token");
  }

  showModal(){

  }

  render(){
    return (
      <AppBackground>
        <Content style={[appStyles.content]}>
          <LoginHeader/>
          <Row>
              <Col>
                  <Form style={appStyles.loginForm}>
                      <FormItem style={appStyles.loginInput} regular>
                          <Input style={[appStyles.baseFont]} placeholder='Email' value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                          <Icon active  type="FontAwesome" name='user' />
                      </FormItem>
                  </Form>
                  <Button full style={[appStyles.button,appStyles.btnPadding]} onPress={this.resetPassword}>
                      <Text style={[appStyles.btnTxt,appStyles.baseFont]}>Reset Password</Text>
                  </Button>
                  <Button full style={[appStyles.button,appStyles.btnPadding]} onPress={this.showResetPassword}>
                      <Text style={[appStyles.btnTxt,appStyles.baseFont]}>Already Have Token</Text>
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
  }
}

const mapStateToProps = (state) => {
    const {app,error}=state;
    return {app,error};
};

export default connect(mapStateToProps,mapDispatchToProps)(ForgetPassword);
