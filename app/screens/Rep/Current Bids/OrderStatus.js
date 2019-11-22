import * as React from 'react';
import {ScrollView, Linking} from 'react-native';
import {Button, Text, Content, View} from 'native-base';

import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";

import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import TableRow from "../../../components/Tables/TableRow";

import {getPhoneURL} from "../../../helpers/app";
import {app} from "../../../store/modules/app";


class OrderStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {title: "Price Per M2", key: "price"},
                {title: "Required M2", key: "order.order_concrete.quantity"},
                {title: "Post Code", key: "order.order_concrete.suburb"},
                {title: "Type", key: "order.order_concrete.type"}, {title: "MPA", key: "order.order_concrete.mpa"},
                {title: "Agg", key: "order.order_concrete.agg"}, {title: "slump", key: "order.order_concrete.slump"},
                {title: "ACC", key: "order.order_concrete.acc"},
                {title: "Placement Type", key: "order.order_concrete.placement_type"},
                {title: "Date", key: "order.order_concrete.delivery_date"},
                {title: "Delivery Time", key: "order.order_concrete.time_preference1"},
                {title: "Time Between Deliveries", key: "order.order_concrete.time_deliveries"},
                {title: "On Site/On Call", key: "order.order_concrete.preference"},
                {title: "Message Required", key: "order.order_concrete.message_required"}
            ]
        };
    }

    componentDidMount() {
        this.getSingleOrder();
    }

    getSingleOrder() {
        let id = this.props.navigation.getParam("bid_id");
    }

    showAwaitingButton(bid) {
        return (
            <View>
                {bid["order"]["status"] !== "Invoice Paid" ?this.showPaymentButtons(bid): this.showReleaseButton(bid)}

                <Button style={[appStyles.button, appStyles.buttonPrimary]}
                        onPress={() => {
                            Linking.openURL(getPhoneURL(bid["order"]["user"]["detail"]["concrete"])).catch((err) => {
                                // console.log(err);
                            });
                        }}>
                    <Text>Contact Contractor</Text>
                </Button>

                <Button danger style={[appStyles.button]}
                        onPress={() => {
                            this.props.cancelOrder(bid["order"]["id"])
                        }}>
                    <Text>Cancel Order</Text>
                </Button>
            </View>
        );
    }

    showPaymentButtons(bid) {
        return (
            <View>
                <Button style={[appStyles.button, appStyles.buttonPrimary]}
                        onPress={() => {
                            this.props.updatePaymentType(bid["id"], "Account");
                        }}>
                    <Text>Account Payment</Text>
                </Button>
                <Button style={[appStyles.button, appStyles.buttonPrimary]}
                        onPress={() => {
                            this.props.updatePaymentType(bid["id"], "COD");
                        }}>
                    <Text>Invoice Paid (COD)</Text>
                </Button>
            </View>
        )
    }

    showReleaseButton(bid) {
        return (
            <View style={[appStyles.button, appStyles.buttonPrimary]}>
                <Button onPress={() => {
                    this.props.releaseOrder(bid["order"]["id"]);
                }}>
                    <Text>Release</Text>
                </Button>
            </View>
        )
    }


    render() {
        let bid = this.props.navigation.getParam("bid");

        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title={"Order Status"}/>
                    <Content style={appStyles.bottomMarginDefault}>
                        <View style={[appStyles.bgWhite, appStyles.mb_10]}>
                            <TableRow rowData={bid} rowColumns={this.state.rowColumns}/>
                        </View>
                        {bid["order"]["status"] !== "Complete"&&bid["order"]["status"]!=="Cancelled" ? this.showAwaitingButton(bid) : null}

                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePaymentType: (bid_id, payment_type) => {
            return dispatch(actions.order.updatePaymentType(bid_id, payment_type));
        },
        cancelOrder: (order_id) => {
            return dispatch(actions.order.repCancelOrder(order_id));
        },
        releaseOrder: (order_id) => {
            return dispatch(actions.order.repReleaseOrder(order_id));
        }
    }
};

export default withNavigation(connect(null, mapDispatchToProps)(OrderStatus));
