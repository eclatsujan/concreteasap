import * as React from 'react';
import { TextInput, StyleSheet, Label, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from './styles.js';



export default class HomeScreen extends React.Component {
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
            <Button transparent onPress={()=>this.props.navigation.navigate("UserProfile")}>
              <Icon name='person' />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content}>

          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("PlaceOrderRequest")}>
            <Text style={styles.mainButtonText}>Place Order Request</Text>
          </Button>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("ViewOrderRequests")}>
            <Text style={styles.mainButtonText}>Pending Orders</Text>
          </Button>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("Accepted Orders")}>
            <Text style={styles.mainButtonText}>Accepted Orders</Text>
          </Button>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("Notifications")}>
            <Text style={styles.mainButtonText}>Notifications</Text>
          </Button>  
          <Button style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Invoices</Text>
          </Button>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("Calculator")}>
            <Text style={styles.mainButtonText}>Calculators</Text>
          </Button>
          <Button style={styles.mainButton}>
            <Text style={styles.mainButtonText}>FAQ</Text>
          </Button>
                     
        </Content>
      </Container>
    );
  }
}