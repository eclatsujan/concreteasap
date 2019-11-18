import React from "react";
import {Image} from "react-native";
import {Button, Icon, Left, Body, Right, Header} from "native-base";
import navigationHelper from "../../helpers/navigationHelper";

import {appStyles} from "../../../assets/styles/app_styles";

export default class AppHeader extends React.Component {

    constructor(props){
        super(props);
    }

    customMenu(){
      return this.props["backMenu"]?<Button
        transparent
       onPress={()=>navigationHelper.goBack()}           >
        <Icon name="arrow-back" style={appStyles.colorPrimary} />
      </Button>:<Button transparent onPress={() => navigationHelper.openDrawer()}>
          <Icon name='menu' style={appStyles.colorPrimary} />
      </Button>;
    }

    render(){
        return (
            <Header style={[appStyles.bgTransparent,appStyles.headerHeight,appStyles.horizontalCenter,appStyles.pb_15]} noShadow>
                <Left>
                  {this.customMenu()}
                </Left>
                <Body>
                    <Image source={require("../../../assets/Logo18.png")} style={appStyles.appHeader} />
                </Body>
                <Right>
                    <Button transparent onPress={()=>navigationHelper.navigate("My Profile")}>
                        <Icon name='person' style={appStyles.colorPrimary}  />
                    </Button>
                </Right>
            </Header>
        );
    }
}
