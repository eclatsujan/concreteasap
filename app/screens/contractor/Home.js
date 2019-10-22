//Core
import * as React from 'react';

//Native Base
import {View,Button,Text,Header,Content,Right,Body,Left,Icon,Title,Grid, Row,
  Col} from 'native-base';

//Drawer Actions
import { DrawerActions } from 'react-navigation-drawer';

import {styles} from './styles.js';
import {appStyles} from "../assets/app_styles";
import { SafeAreaView } from 'react-navigation';

//App Component
import AppBackground from '../../components/AppBackground';
import AppLoading from '../../components/AppLoading';
import AppHeader from '../../components/AppHeader'


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <AppBackground>
        <AppHeader/>
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
      </AppBackground>
    );
  }
}
