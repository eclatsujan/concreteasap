import React from "react";
import { Image, StatusBar,ScrollView,Animated } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";

import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { NavigationActions, StackActions } from 'react-navigation';

export default class SideBar extends React.Component {

  constructor(props){
    super(props);
     
    this.resetTopNavigation = this.resetTopNavigation.bind(this);
  }
 
  resetTopNavigation(route,focused){
    if(typeof route.route.routes !=='undefined'){
      this.props.navigation.navigate({
          routeName: route.route.routes[0].routeName 
      });
    }
    else{
      this.props.navigation.navigate(route.route.routeName);
    }
    
  }

  render() {
    return (
       <ScrollView>
          <SafeAreaView           
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <DrawerNavigatorItems {...{...this.props,onItemPress:this.resetTopNavigation}} />
          </SafeAreaView>
        </ScrollView>
    );
  }
}