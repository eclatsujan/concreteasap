import * as React from 'react';
import { TextInput, StyleSheet, Label, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../../styles.js';



export default class PlaceOrderRequest extends React.Component {
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
        <Text style={{marginTop:20, textAlign:"center", fontSize:20, fontWeight:'bold',}}>Place Order Request</Text>
          
          <View style={{marginTop:100}}>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("PlaceOrder")}>
            <Text style={styles.mainButtonText}>Order Concrete</Text>
          </Button>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("PlaceOrder")}>
            <Text style={styles.mainButtonText}>Order Rio</Text>
          </Button>
          </View>
         </ScrollView>                    
        </Content>
      </Container>
    );
  }
}