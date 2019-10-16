import React from "react";

import {View,ImageBackground,Dimensions} from "react-native";

export default class AppBackground extends React.Component {

    constructor(props){
      super(props);
    }

    render(){
      let { height, width } = Dimensions.get('window');
      return (
          <ImageBackground source={require("../../assets/concrete-background.png")} style={{width,height}}>
              {this.props.children}
          </ImageBackground>
      );
    }

}
