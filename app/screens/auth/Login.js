import * as React from 'react';
import {Picker,Icon,Container,Header,Button,Text,Body,Form,Item as FormItem,Input,Label,Title,Content,Right,Footer,FooterTab,Spinner,Toast} from "native-base";
import {ActivityIndicator,View} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';

import { actions, States } from '../../store';

import {styles} from './styles';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
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

  // demoLogin(){
  //   if(this.state.type==="contractor"){
  //     this.props.navigation.navigate('Home');
  //   }
  //   else{
  //     this.props.navigation.navigate('RepHome');
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   console.log("login");    
  //   //once user Logged in 
  //   if(newProps.user.loggedIn){
  //     this.props.navigation.navigate('AuthLoading');
  //   }
  // }

  setUserType(e){
    this.setState({type:e});
    // console.log(e);
  }

  render() {
    console.log(this.props.app.loading);
    if(this.props.app.loading){
      return (
        <View style={styles.container}>
           <ActivityIndicator size="large" color="#00ff00"/>
        </View>
      );
    }
    else{
      return (      
        <Container>
          <Header>  
            <Body>
              <Title>Concrete ASAP</Title>
            </Body>
          </Header>
          <Content>            
            <Form>
              <FormItem floatingLabel>
                <Label>Email</Label>
                <Input value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
              </FormItem>
              <FormItem floatingLabel last>
                <Label>Password</Label>
                <Input value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
              </FormItem>
              <Button full primary style={styles.button} onPress={()=> this.login()}>
                <Text>Login</Text>
              </Button>                 
              <Button full primary style={styles.button} onPress={()=> this.props.navigation.navigate('Register')}>
                <Text>Register</Text>
              </Button>            
            </Form>
          </Content>
          <Footer>
            <FooterTab>
              <Text>Footer</Text>
            </FooterTab>
          </Footer>
        </Container>      
      );
    }    
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (username,password) => {
      return dispatch(actions.user.login(username,password))
    },
  }
}

const mapStateToProps = (state) => {
  const {user,app}=state;
  return {user,app};
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);