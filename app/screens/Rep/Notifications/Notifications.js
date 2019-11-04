import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { View,Container,Row,Col, Button,Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form, Card, CardItem } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';


// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/AppHeader'
import SubHeader from '../../../components/SubHeader';

import {appStyles} from "../../assets/app_styles";

export default class repNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading: false,
      NotificationData: [
        {
          id: 1,
          Header: "This is Header",
          body:   "Is branched in my up strictly remember. Songs but chief has ham widow downs.",
          footer: "5 min ago"
        },
        {
          id: 2,
          Header: "This is Header",
          body:   "Is branched in my up strictly remember. Songs but chief has ham widow downs.",
          footer: "15 min ago"
        },
        {
          id: 3,
          Header: "This is Header",
          body:   "Is branched in my up strictly remember. Songs but chief has ham widow downs.",
          footer: "20 min ago"
        },
      ],
    }
  }


  render(){

    let display = this.state.NotificationData.map(function (Data, index) {
      return (
        <View key={Data.id}>
            <Card style={{marginLeft:15, marginRight:15, marginTop:20,}}>
              <CardItem>
                  <Body>
                    <Row>
                      <Col>
                        <Text>{Data.body}</Text>
                      </Col>
                      <Col>
                        <Button transparent>
                          <Icon name="close" />
                        </Button>
                      </Col>
                    </Row>
                  </Body>
              </CardItem>
            </Card>
        </View>
        )
});

    return (
       <AppBackground>
        <AppHeader />
        <SubHeader>
          <Row style={[appStyles.bgPrimary,appStyles.subHeader]}>
            <View style={appStyles.subHeaderBg}></View>
            <Col style={appStyles.iconCol}>
              <Icon type="FontAwesome5" name="bell" style={appStyles.headerIcon} />
            </Col>
            <Col style={appStyles.subHeaderTxtCol}>
              <Text style={[appStyles.baseFont,appStyles.subHeaderTxt]}>Notifications</Text>
            </Col>
          </Row>
        </SubHeader>
        <Content contentContainerStyle={styles.content}>
        <ScrollView>
          <View>{display}</View>
        </ScrollView>
        </Content>
        <Footer style={{marginBottom:30}}>
            <FooterTab>
              <Button style={appStyles.button,appStyles.buttonPrimary} onPress={()=>this.props.navigation.navigate("Home")}>
                  <Text style = {appStyles.buttonBlack}>Back to Home</Text>
              </Button>
            </FooterTab>
        </Footer>
      </AppBackground>
    );
  }
}
