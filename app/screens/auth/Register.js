import * as React from 'react';
import {Dimensions, Image, ImageBackground,StatusBar,BackHandler} from "react-native";

import {Container,Header,Button,Text,Body,Form,Title,Content,Left,Icon,Row,Col,Grid} from "native-base";

//Custom Component
import AppBackground from '../../components/AppBackground';
import LoginHeader from '../../components/LoginHeader';

import {appStyles} from '../assets/app_styles';

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {

        };
  	}

    render() {
        return (
            <AppBackground>
              <Content style={[appStyles.content]}>
                  <LoginHeader/>
                  <Row style={[appStyles.marginAppDefault,{flex:1}]}>
                      <Col>
                          <Form>
                              <Button full style={appStyles.button} onPress={()=> this.props.navigation.navigate('RegContractor')}>
                                  <Text style={appStyles.btnTxt}>Register as Contractor</Text>
                              </Button>
                              <Button full style={appStyles.button} onPress={()=> this.props.navigation.navigate('repRegister')}>
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
