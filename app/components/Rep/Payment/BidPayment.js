import React from "react";
import {Modal} from "react-native";
import {View, Button, Text} from 'native-base';

import {appStyles} from "../../../../assets/styles/app_styles";

export default class BidPayment extends React.Component {

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
                <View style={[appStyles.flex1,appStyles.horizontalCenter,appStyles.verticalCenter,appStyles.modalBg]}>
                    <View style={[appStyles.modalView,appStyles.bgWhite, appStyles.verticalCenter]}>
                        <View style={[appStyles.p_10]}>
                            <Text style={[appStyles.txtCenter, appStyles.colorBlack]}>
                                <Text style={[appStyles.baseLargeFontSize,appStyles.baseFont]}>Bid </Text>
                                <Text style={[appStyles.baseFont]}>For Order #511</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={appStyles.baseFont}>
                                <Text style={[appStyles.baseLargeFontSize,appStyles.baseFont]}>$15 </Text>
                                <Text style={[appStyles.baseFont,appStyles.baseFontSize]}>AUD</Text>
                            </Text>
                        </View>
                        <View>
                            <View>
                                <Button style={[appStyles.my_5,appStyles.w_100]} onPress={this.props["handleModel"]}>
                                    <Text style={[appStyles.colorBlack,appStyles.selfCenter]}>Pay Now</Text>
                                </Button>
                                <Button danger style={[appStyles.my_5,appStyles.w_100]} onPress={this.props["cancelModel"]}>
                                    <Text style={appStyles.colorBlack}>Cancelled</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

}
