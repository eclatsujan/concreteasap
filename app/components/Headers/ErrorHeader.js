import React from "react";
import {View} from "react-native";
import {Row, Text, Icon} from "native-base";

import {appStyles} from "../../../assets/styles/app_styles";

export default class ErrorHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.error.error_msg === "" || !this.props.error.error_msg) {
            return (<Text></Text>);
        } else {
            return (
                <Row
                    style={[appStyles.bgError, appStyles.pad_5, appStyles.mt_1, appStyles.w_100, appStyles.contentCenter]}>
                    <View style={[appStyles.pr_5]}>
                        <Icon name='close-circle' style={[appStyles.colorWhite]}/>
                    </View>
                    <View>
                        <Text style={[appStyles.colorWhite]}>{this.props.error.error_msg}</Text>
                    </View>
                </Row>
            );
        }
    }
}
