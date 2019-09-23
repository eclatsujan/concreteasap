import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Grid,Col } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';



export default class OrderStatus extends React.Component {
  constructor(props) {
    super(props);    
  }

  render(){

    return (
       <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
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
          <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Order Status</Text>
          <Grid>
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
          </Grid>
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
          <View style={{marginTop:30,
                        width: "99%",
                        alignItems: 'center',
                        marginBottom: 20,}}>
                        <TouchableOpacity >
                          <Text style = {styles.buttonText}>Account Payment</Text>
                        </TouchableOpacity>
            </View>
            <View style={styles.registerButton}>
                        <TouchableOpacity >
                          <Text style = {styles.buttonText}>Invoice Paid (COD)</Text>
                        </TouchableOpacity>
            </View>
            <View style={styles.registerButton}>
                        <TouchableOpacity >
                          <Text style = {styles.buttonText}>Contact Contractor</Text>
                        </TouchableOpacity>
            </View>
            <View style={styles.registerButton}>
                        <TouchableOpacity >
                          <Text style = {{textAlign: 'center',
                                          fontSize: 20,
                                          backgroundColor: 'red',
                                          padding: 10,
                                          width: 300,
                                          marginTop: 10,
                                          borderRadius: 25,
                                          borderWidth: 1,}}>Cancel Order</Text>
                        </TouchableOpacity>
            </View>
            </ScrollView>
        </Content>
      </Container>
    );
  }
}