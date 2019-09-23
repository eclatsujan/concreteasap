import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Grid,Col } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';



export default class ViewFullOrderDetails extends React.Component {
  constructor(props) {
    super(props);    
  }

  nextActions(formData,special){
     if(formData.message_required!=="No"){
          this.props.navigation.navigate("ReviewInstructions",{formData:formData,special:special})
     }
     else{

     }
    
  }

  render(){

    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const formData = params ? params.formData : null;
    const special = params ? params.special : null;
    //console.log("Checking data",formData);
    //console.log("Checking Checking",special);

    return (
       <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Concrete ASAP</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='person' />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content}>
        <ScrollView>
          <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Order Details</Text>
          <Grid>
            <Col style={{marginLeft:15, marginTop:15}}>
              <Text>Suburb / Post Code</Text>
              <Text>Type</Text>
              <Text>MPA</Text>
              <Text>AGG</Text>
              <Text>Slump</Text>
              <Text>Addatives</Text>
              <Text>Placement Type</Text>
              <Text>Quantity</Text>
              <Text>Time</Text>
              <Text>Date</Text>
              <Text>Urgency</Text>
              <Text>On Site / Call</Text>
            </Col>
            <Col style={{marginTop:15}}>
              <Text>Suburb / Post Code</Text>
              <Text>Type</Text>
              <Text>MPA</Text>
              <Text>AGG</Text>
              <Text>Slump</Text>
              <Text>Addatives</Text>
              <Text>Placement Type</Text>
              <Text>Quantity</Text>
              <Text>Time</Text>
              <Text>Date</Text>
              <Text>Urgency</Text>
              <Text>On Site / Call</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={{marginLeft:15, marginTop:15}}>
                <Text style={{marginTop:20}}>Colors:</Text>
            </Col>
            <Col style={{marginTop:15}}>
              <Text style={{marginTop:20}}>Warmly little before cousin sussex entire men set. Blessing it ladyship on sensible judgment settling outweigh. Worse linen an of civil jokes leave offer.</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={{marginLeft:15, marginTop:15}}>
                <Text style={{marginTop:20}}>Special Instructions:</Text>
            </Col>
            <Col style={{marginTop:15}}>
              <Text style={{marginTop:20}}>Warmly little before cousin sussex entire men set. Blessing it ladyship on sensible judgment settling outweigh. Worse linen an of civil jokes leave offer.</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={{marginLeft:15, marginTop:15}}>
                <Text style={{marginTop:20}}>Delivery Instructions:</Text>
            </Col>
            <Col style={{marginTop:15}}>
              <Text style={{marginTop:20}}>Warmly little before cousin sussex entire men set. Blessing it ladyship on sensible judgment settling outweigh. Worse linen an of civil jokes leave offer.</Text>
            </Col>
          </Grid>
            <View style={styles.registerButton}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("DayOfPour")}>
                    <Text style = {styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}