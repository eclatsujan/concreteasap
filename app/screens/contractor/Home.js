import * as React from 'react';
import {TextInput, StyleSheet, Label, ScrollView, ImageBackground, Image, Dimensions,Platform, StatusBar} from 'react-native';
import {
  View,
  Container,
  Button,
  Text,
  Header,
  Content,
  Right,
  Body,
  Left,
  Icon,
  Footer,
  FooterTab,
  Title,
  Grid, Row, Col
} from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from './styles.js';
import {appStyles} from "../assets/app_styles";
import { SafeAreaView } from 'react-navigation';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let { height, width } = Dimensions.get('window');
    return (
      <SafeAreaView>
        <ImageBackground source={require("../../../assets/concrete-background.png")} style={{width,height}}>
          <Container style={[appStyles.bgTransparent,{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}]}>
            <Header style={[appStyles.headerHeight]} transparent>
              <Left>
                <Button
                    transparent
                    onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                >
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <View>
                  <Image source={require("../assets/Logo18.png")} style={appStyles.logoHeader} />
                </View>
              </Body>
              <Right>
                <Button transparent onPress={()=>this.props.navigation.navigate("UserProfile")}>
                  <Icon name='person' />
                </Button>
              </Right>
            </Header>
            <Content contentContainerStyle={appStyles.content}>
              <View style={appStyles.paddingDefault}>
                <Button style={appStyles.button} onPress={()=>this.props.navigation.navigate("PlaceOrderRequest")}>
                  <Text style={styles.mainButtonText}>Place Order Request</Text>
                </Button>
                <Button style={appStyles.button} onPress={()=>this.props.navigation.navigate("ViewOrderRequests")}>
                  <Text style={styles.mainButtonText}>Pending Orders</Text>
                </Button>
                <Button style={appStyles.button} onPress={()=>this.props.navigation.navigate("Accepted Orders")}>
                  <Text style={styles.mainButtonText}>Accepted Orders</Text>
                </Button>
                <Button style={appStyles.button} onPress={()=>this.props.navigation.navigate("Notifications")}>
                  <Text style={styles.mainButtonText}>Notifications</Text>
                </Button>
                <Button style={appStyles.button}>
                  <Text style={styles.mainButtonText}>Invoices</Text>
                </Button>
                <Button style={appStyles.button} onPress={()=>this.props.navigation.navigate("Calculator")}>
                  <Text style={styles.mainButtonText}>Calculators</Text>
                </Button>
                <Button style={appStyles.button}>
                  <Text style={styles.mainButtonText}>FAQ</Text>
                </Button>
              </View>
            </Content>
          </Container>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}