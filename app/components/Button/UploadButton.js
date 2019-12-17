import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Text} from 'native-base';

import {appStyles} from "../../../assets/styles/app_styles";

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let placeholder = this.props.placeholder ? this.props.placeholder : "Select Logo";
        return (
            <View style={[appStyles.bgWhite, appStyles.borderRadiusDefault, appStyles.my_5]}>
                <TouchableOpacity
                    style={[appStyles.baseFont, appStyles.py_5, appStyles.px_10]}
                    onPress={this.props["onUpload"]}>
                    <View style={[appStyles.flexRow]}>
                        <View style={[appStyles.w_65, appStyles.horizontalCenter]}>
                            <Text style={[appStyles.defaultFont, appStyles.baseFontSize,appStyles.inputGray]}>{placeholder}</Text>
                        </View>
                        <View
                            style={[appStyles.w_35, appStyles.bgBlack, appStyles.py_10, appStyles.borderRadiusDefault]}>
                            <Text
                                style={[appStyles.colorWhite, appStyles.txtCenter, appStyles.baseFontSize, appStyles.boldFont]}>
                                Upload
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}