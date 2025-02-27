import React from "react";
import {Image} from "react-native";
import {Row, Col} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";

export default class LoginHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col style={[appStyles.contentCenter]}>
                    <Image source={require("../../../assets/Logo18.png")} style={appStyles.logoHeader}/>
                </Col>
            </Row>
        );
    }
}
