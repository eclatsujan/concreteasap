import React from "react";
import { Image, StatusBar,ScrollView,Animated,Platform,View,StyleSheet  } from "react-native";
import {Row,Col} from 'native-base';
import Svg,{Polygon} from 'react-native-svg';

export default class SubHeader extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  render(){
    return (
      <View style={{paddingTop:30,height:125,paddingLeft:15,paddingRight:15,position:"relative"}}>
        <Svg height="100%" width="100%">
          <Polygon width="100%" fill-rule="evenodd" clip-rule="evenodd" fill="#59BA47" fill-opacity="0.9961" points="410.25,64.436 0.25,80 0.25,0   410.25,0 "/>
        </Svg>
        <View style={{position:"absolute",top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          { this.props.children }
        </View>
      </View>
    );
  }
}
