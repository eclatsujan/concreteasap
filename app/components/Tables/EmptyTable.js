import React from "react";
import {Row, Col, View, Text, Icon, Button} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";

export default class EmptyTable extends React.Component {

    render(){
        return (
            <View style={[appStyles.bgWhite,appStyles.customCard]}>
                <Row>
                    <Col>
                        <Text style={[appStyles.arialFont,appStyles.baseFontSize]}>{this.props["message"]}</Text>
                    </Col>
                </Row>
            </View>
        );
    }
}