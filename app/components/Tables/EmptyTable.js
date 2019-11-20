import React from "react";
import {Row, Col, View, Text, Icon, Button} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";

export default class EmptyTable extends React.Component {

    render(){
        return (
            <View style={[appStyles.bgWhite,appStyles.p_10]}>
                <Row>
                    <Col>
                        <Text style={appStyles.arialFont}>{this.props["message"]}</Text>
                    </Col>
                </Row>
            </View>
        );
    }
}