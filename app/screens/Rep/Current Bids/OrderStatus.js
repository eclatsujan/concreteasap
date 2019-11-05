import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Grid,Col,Row } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';

import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";

import {appStyles} from "../../assets/app_styles";

export default class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    return (
       <AppBackground>
        <AppHeader />
        <SubHeader>
          <Row style={[appStyles.bgPrimary,appStyles.subHeader]}>
            <View style={appStyles.subHeaderBg}></View>
            <Col style={appStyles.iconCol}>
              <Icon type="FontAwesome5" name="running" style={appStyles.headerIcon} />
            </Col>
            <Col style={appStyles.subHeaderTxtCol}>
              <Text style={[appStyles.baseFont,appStyles.subHeaderTxt]}>Order Status</Text>
            </Col>
          </Row>
        </SubHeader>
        <Content>
          <ScrollView>
            <Row style={[appStyles.bgWhite]}>
              <Col style={{marginLeft:15, marginTop:15}}>
                <Text>TOTAL PRICE</Text>
                <Text>Price per m2</Text>
                <Text>Required m2</Text>
              </Col>
              <Col style={{marginTop:15}}>
                <Text>$2000</Text>
                <Text>$200</Text>
                <Text>10</Text>
              </Col>
            </Row>
            <Button style={[appStyles.button,appStyles.buttonPrimary]}>
              <Text>Account Payment</Text>
            </Button>
            <Button style={[appStyles.button,appStyles.buttonPrimary]}>
              <Text>Invoice Paid (COD)</Text>
            </Button>
            <Button style={[appStyles.button,appStyles.buttonPrimary]}>
              <Text>Contact Contractor</Text>
            </Button>
            <Button danger style={[appStyles.button]}>
              <Text>Cancel Order</Text>
            </Button>
          </ScrollView>
        </Content>
      </AppBackground>
    );
  }
}
