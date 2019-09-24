import * as React from 'react';
import { TextInput, StyleSheet, Label, ScrollView } from 'react-native';
import { Grid,Col, View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../../styles.js';



export default class DayOfPour extends React.Component {
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
        <Text style={{marginTop:20, textAlign:"center", fontSize:20, fontWeight:'bold',}}>Day Of Pour</Text>
          <Button style={{width:"95%",
                  marginBottom:20,
                  marginTop:40,
                  alignSelf:"center",
                  paddingTop:10,
                  paddingBottom:10,}} onPress={()=>this.props.navigation.navigate("ViewFullOrderDetails")}>
            <Text style={styles.mainButtonText}>View Full Order Details</Text>
          </Button>
          <Grid style={{marginBottom:20}}>
            <Col style={{marginLeft:15, marginTop:15}}>
              <Text style={{fontSize:20}}>On Site / Call</Text>
              <Text>Total Amount</Text>
              <Text>Order Number</Text>
              <Text>Delivery Date</Text>
              <Text>Delivery Time</Text>
              <Text>Delivery Address</Text>
            </Col>
            <Col style={{marginTop:15}}>
              <Text style={{fontSize:20}}>On Site</Text>
              <Text>Total Amount</Text>
              <Text>Order Number</Text>
              <Text>Delivery Date</Text>
              <Text>Delivery Time</Text>
              <Text>Delivery Address</Text>
            </Col>
          </Grid>
          <Button style={styles.mainButton}>
            <Text style={styles.mainButtonText} >Confirm Order Delivery</Text>
          </Button>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("ModifyOrder")}>
            <Text style={styles.mainButtonText}>Modify Order</Text>
          </Button>
          <Button style={styles.mainButton}>
            <Text style={styles.mainButtonText} >Complete Order</Text>
          </Button>  
          <Button style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Contact Rep</Text>
          </Button>
          <Button style={{width:"95%",
                          marginBottom:20,
                          alignSelf:"center",
                          paddingTop:10,
                          paddingBottom:10,
                          backgroundColor:'red'}}>
            <Text style={styles.mainButtonText}>Cancel Order</Text>
          </Button>
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