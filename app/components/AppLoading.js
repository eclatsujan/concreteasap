import React from "react";
import {View,ActivityIndicator} from "react-native";
import {appStyles} from "../../assets/styles/app_styles";

export default class AppLoading extends React.Component {

    constructor(props){
      super(props);
    }

    render(){
      return (
        <View style={appStyles.container}>
          <ActivityIndicator size="large" color="#00ff00"/>
        </View>
      );
    }

}
