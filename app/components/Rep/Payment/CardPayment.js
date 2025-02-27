import React from "react";
import {Modal} from "react-native";
import {View, Button, Text, Title} from 'native-base';

import {appStyles} from "../../../../assets/styles/app_styles";

export default class CardPayment extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props["modalVisibility"]}>
                <View style={[appStyles.flex1, appStyles.verticalCenter,appStyles.horizontalCenter,appStyles.modalBg]}>
                    <View style={[appStyles.modalView, appStyles.bgWhite, appStyles.borderRadiusDefault,appStyles.p_20]}>
                        <View>
                            <Text style={[appStyles.txtCenter, appStyles.colorBlack,appStyles.baseLargeFontSize]}>
                                Do you wanna save the card
                                details?
                            </Text>
                        </View>
                        <View style={appStyles.justifyItemsCenter}>
                            <View style={appStyles.w_65}>
                                <Button style={[appStyles.my_5,appStyles.w_100,appStyles.justifyItemsCenter]} onPress={() => this.props["handleModel"](true)}>
                                    <Text style={appStyles.colorBlack}>Yes</Text>
                                </Button>
                                <Button style={[appStyles.my_5,appStyles.w_100,appStyles.justifyItemsCenter]} onPress={() => this.props["handleModel"](false)}>
                                    <Text style={appStyles.colorBlack}>No</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

}
