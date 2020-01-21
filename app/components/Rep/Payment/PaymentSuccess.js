import React from "react";
import {Modal, TouchableOpacity} from "react-native";
import {View, Button, Text, Title, Icon} from 'native-base';

import {appStyles} from "../../../../assets/styles/app_styles";
import {app} from "../../../store/modules/app";

export default class PaymentSuccess extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal animationType="slide" transparent={true} visible={this.props["modalVisibility"]}
                   onRequestClose={(title, message) => {
                       this.props["handleModel"]();
                   }}
                   onBackdropPress={() => { }}>

                <TouchableOpacity
                    style={[appStyles.modalBg, appStyles.verticalCenter, appStyles.horizontalCenter, appStyles.flex1]}
                    onPress={() => {
                        this.props["handleModel"]();
                    }}>

                    <View
                        style={[appStyles.modalView, appStyles.bgWhite, appStyles.p_20, appStyles.borderRadiusDefault]}>

                        <View style={[appStyles.pb_30]}>
                            <Text style={[appStyles.upperCase, appStyles.baseLargeFontSize, appStyles.txtCenter]}>
                                Your Bid has been placed.
                            </Text>
                        </View>
                        <View style={[appStyles.justifyItemsCenter]}>
                            <Icon type={"FontAwesome5"} name={"check-circle"} size={50}
                                  style={appStyles.colorPrimary}/>
                        </View>

                    </View>
                </TouchableOpacity>
            </Modal>

        );
    }

}
