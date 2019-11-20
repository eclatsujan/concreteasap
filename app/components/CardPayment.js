import React from "react";
import {Modal} from "react-native";
import {View, Button, Text, Title} from 'native-base';

import {appStyles} from "../../assets/styles/app_styles";

export default class CardPayment extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props["modalVisibility"]}
                onRequestClose={(title, message) => {
                    Alert.alert('Modal has been closed.', message);
                }}>
                <View style={[appStyles.flex1, appStyles.justifyItemsCenter, appStyles.flexColumn,appStyles.modalBg]}>
                    <View style={[appStyles.modalView, appStyles.bgWhite, appStyles.verticalCenter]}>
                        <View style={[appStyles.p_10]}>
                            <Text style={[appStyles.txtCenter, appStyles.colorBlack]}>
                                Do you wanna save the card
                                details?
                            </Text>
                        </View>
                        <View>
                            <Button style={[appStyles.my_5,appStyles.w_100]} onPress={() => this.props["handleModel"](true)}>
                                <Text style={appStyles.colorBlack}>Yes</Text>
                            </Button>
                            <Button style={[appStyles.my_5,appStyles.w_100]} onPress={() => this.props["handleModel"](false)}>
                                <Text style={appStyles.colorBlack}>No</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

}
