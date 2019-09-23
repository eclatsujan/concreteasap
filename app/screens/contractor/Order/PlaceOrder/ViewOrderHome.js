import * as React from 'react';
import { TextInput, StyleSheet, Label, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../../styles.js';



export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);    
  }

  render(){
    const { params } = this.props.navigation.state;
    const message = params ? params.message : null;
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
        <ScrollView>
        <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold', color: 'red',marginTop:50, marginButton:20}}>{message}</Text>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("Pending Order")}>
            <Text style={styles.mainButtonText}>View Order Requests</Text>
          </Button>
          <Button style={styles.mainButton} onPress={()=>this.props.navigation.navigate("Home")}>
            <Text style={styles.mainButtonText}>Back To Home</Text>
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