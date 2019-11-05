import * as React from 'react';
import {Dimensions, Image, ImageBackground,StatusBar,BackHandler} from "react-native";

import {View,Container,Header,Button,Text,Body,Form,Title,Content,Left,Icon,Row,Col,Grid} from "native-base";

//Custom Component
import AppBackground from '../../components/AppBackground';
import LoginHeader from '../../components/Headers/LoginHeader';

import {appStyles} from '../assets/app_styles';

export default class RegisterLanding extends React.Component {

    constructor() {
        super();
        this.state = {

        };
  	}

    render() {
        return (
            <AppBackground alignTop={false} alignContent="center" >
              <Content>
                  <LoginHeader/>
                  <Row style={[appStyles.marginAppDefault]}>
                      <Col>
                          <Form>
                              <Button full style={[appStyles.button,appStyles.paddingXDefault]} onPress={()=> this.props.navigation.navigate('Register',{"roles":"contractor","title":"Register as Contractor"})}>
                                  <Text style={appStyles.btnTxt}>Register as Contractor</Text>
                              </Button>
                              <Button full style={[appStyles.button,appStyles.paddingXDefault]} onPress={()=> this.props.navigation.navigate('Register',{"roles":"rep","title":"Register as Rep"})}>
                                  <Text style={appStyles.btnTxt}>Register as Rep</Text>
                              </Button>
                          </Form>
                      </Col>
                  </Row>
              </Content>
            </AppBackground>
        );
    }
}
