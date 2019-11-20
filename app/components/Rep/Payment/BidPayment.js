import React from "react";
import {Modal} from "react-native";
import {View, Button, Text, Title} from 'native-base';

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
                >
                <View
                    style={[appStyles.modalBg, appStyles.verticalCenter, appStyles.horizontalCenter, appStyles.flex1]}>
                    <View
                        style={[appStyles.modalView, appStyles.bgWhite, appStyles.p_20, appStyles.borderRadiusDefault]}>
                        <View style={[{height: 25}, appStyles.pb_5, appStyles.borderGray44, appStyles.borderBottom2]}>
                            <View
                                style={[appStyles.flexRow, appStyles.flexWrap, appStyles.justifyItemsCenter]}>
                                <Text style={[appStyles.baseExtraLargeFontSize]}>BID </Text>
                                <Text style={[appStyles.baseLargeFontSize]}>FOR ORDER #{this.props["order_id"]}</Text>
                            </View>
                        </View>
                        <View style={[{height: 50}, appStyles.my_30]}>
                            <View style={[appStyles.flexRow, appStyles.flexWrap, appStyles.justifyItemsCenter]}>
                                <Text style={[appStyles.baseExtraLargeFontSize]}>$15 </Text>
                                <Text style={[appStyles.baseLargeFontSize]}>AUD</Text>
                            </View>
                        </View>
                        <View style={appStyles.justifyItemsCenter}>
                            <View style={appStyles.w_65}>
                                <Button style={[appStyles.my_5, appStyles.w_100, appStyles.justifyItemsCenter]}
                                        onPress={this.props["handleModel"]}>
                                    <Text style={[appStyles.colorBlack]}>Pay Now</Text>
                                </Button>
                                <Button danger style={[appStyles.my_5, appStyles.w_100, appStyles.justifyItemsCenter]}
                                        onPress={this.props["cancelModel"]}>
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
