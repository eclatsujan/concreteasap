import React from "react";
import {Image} from "react-native";
import {Row,Col,Text} from "native-base";
import {appStyles} from "../screens/assets/app_styles";

export default class ErrorHeader extends React.Component {

    constructor(props){
        super(props);

    }



    render(){
      return (
        <Row>
          <Col style={[appStyles.contentCenter,{marginTop:20}]}>
            <Text>{this.props.error.error_msg}</Text>
          </Col>
        </Row>
      );
    }
}
