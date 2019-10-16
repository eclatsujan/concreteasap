import React from "react";
import {Image} from "react-native";
import {Row,Col} from "native-base";
import {appStyles} from "../screens/assets/app_styles";

export default class LoginHeader extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
      return (
        <Row>
          <Col style={[appStyles.contentCenter,{marginTop:20}]}>
            <Image source={require("../../assets/Logo18.png")} style={appStyles.logoHeader} />
          </Col>
        </Row>
      );
    }
}
