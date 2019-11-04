import React from "react";
import {View,ActivityIndicator} from "react-native";
import {appStyles} from "../screens/assets/app_styles";
import {Button,Text,Footer,FooterTab} from "native-base";

import navigationHelper from "../helpers/navigationHelper";

export default class CalculatorTab extends React.Component {

    constructor(props){
      super(props);
      this.state={

      };
    }

    render(){
      return (
        <Footer>
          <FooterTab style={appStyles.bgPrimary}>
            <Button active={!!this.props["firstButton"]} style={this.props["firstButton"]?appStyles.bgSecondary:{}} onPress={()=>navigationHelper.navigate("first")}>
              <Text style={this.props["firstButton"]?appStyles.colorWhite:appStyles.colorBlack}>Slab</Text>
            </Button>
            <Button active={!!this.props["secondButton"]} style={this.props["secondButton"]?appStyles.bgSecondary:{}} onPress={()=>navigationHelper.navigate("second")}>
              <Text style={this.props["secondButton"]?appStyles.colorWhite:appStyles.colorBlack}>Footing</Text>
            </Button>
            <Button active={!!this.props["thirdButton"]} style={this.props["thirdButton"]?appStyles.bgSecondary:{}} onPress={()=>navigationHelper.navigate("third")}>
              <Text style={this.props["thirdButton"]?appStyles.colorWhite:appStyles.colorBlack}>Column</Text>
            </Button>
            <Button active={!!this.props["fourthButton"]} style={this.props["fourthButton"]?appStyles.bgSecondary:{}} onPress={()=>navigationHelper.navigate("fourth")}>
              <Text style={this.props["fourthButton"]?appStyles.colorWhite:appStyles.colorBlack}>Steps</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }

}
