import React from "react";
import {View,TouchableOpacity} from "react-native";
import {Icon,Text} from 'native-base';

import {appStyles} from "../screens/assets/app_styles";

export default class HomeButton extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let iconType=this.props["iconType"]?this.props["iconType"]:"FontAwesome5";
    return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={{width:"100%"}}>
            <View style={[appStyles.button,appStyles.buttonSecondary,appStyles.paddingYDefault,appStyles.flexRow]}>
              <View style={[appStyles.w_35,appStyles.verticalCenter]}>
                <View style={[appStyles.circle,appStyles.flexRow,appStyles.flexCenter]}>
                  <Icon active  type={iconType} name={this.props.iconName} style={appStyles.buttonHomeIcon} />
                </View>
              </View>
              <View style={[appStyles.w_65,appStyles.flexRow,appStyles.verticalCenter]}>
                <Text style={appStyles.buttonHomeTxt}>{this.props.text}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}
