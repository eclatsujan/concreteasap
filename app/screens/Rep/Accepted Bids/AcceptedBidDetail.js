import * as React from 'react';
import {ScrollView, Linking, Alert} from 'react-native';
import {Button, Text, Content, View} from 'native-base';

import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";

import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import TableRow from "../../../components/Tables/TableRow";

import {boolToAffirmative} from "../../../helpers/app";
import {formatDate, formatTime,formatPrice} from "../../../helpers/time";


class AcceptedBidDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {title: "Order Delivery Date", key: "date_delivery", format: formatDate},
                {title: "Order Delivery Time", key: "time_delivery", format: formatTime},
                {title: "Price Per M3", key: "price",format:formatPrice},
                {title: "Required M3", key: "order.order_concrete.quantity"},
                {title:"Total Amount", key:"total",format:formatPrice},
                {title: "Address", key: "order.order_concrete.address"},
                {title: "Post Code", key: "order.order_concrete.suburb"},
                {title: "Type", key: "order.order_concrete.type"}, {title: "MPA", key: "order.order_concrete.mpa"},
                {title: "Agg", key: "order.order_concrete.agg"}, {title: "slump", key: "order.order_concrete.slump"},
                {title: "ACC", key: "order.order_concrete.acc"},
                {title: "Placement Type", key: "order.order_concrete.placement_type"},
                {title: "Time Between Deliveries", key: "order.order_concrete.time_deliveries"},
                {title: "On Site/On Call", key: "order.order_concrete.preference"},
                {title: "Message Required", key: "order.order_concrete.message_required", format: boolToAffirmative},
                {title: "Delivery Instructions", key: "order.order_concrete.delivery_instructions"},
                {title: "Special Instructions", key: "order.order_concrete.special_instructions"},
                {title: "Colours", key: "order.order_concrete.colours"},
            ]
        };

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.interval = setInterval(() => {
                this.props.getRepAcceptedBids();
            }, 6000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });

        this.getSingleBid = this.getSingleBid.bind(this);
    }

    componentDidMount() {
        this.props.getRepAcceptedBids();
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    showAwaitingButton(bid) {
        let status=bid.get("order").get("status");
        return (
            <View>
                {status !== "Invoice Paid" ? this.showPaymentButtons(bid) : this.showReleaseButton(bid)}

                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.navigation.navigate("Rep View Message", {
                                message: bid.get("order").get("message"),
                                order_id:bid.get("order").get("id")
                            });
                        }}>
                    <Text style={appStyles.colorBlack}>View Message/Balance of Order</Text>
                </Button>

                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.navigation.navigate("Rep User Contact Detail", {
                                user: bid.get("order").get("user")
                            });
                        }}>
                    <Text style={appStyles.colorBlack}>Contact Contractor</Text>
                </Button>

                <Button danger style={[appStyles.button, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.cancelOrder(bid.get("order").get("id"))
                        }}>
                    <Text style={appStyles.colorBlack}>Reschedule Order</Text>
                </Button>
            </View>
        );
    }

    showPaymentButtons(bid) {
        return (
            <View>
                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.updatePaymentType(bid.get("id"), "Account");
                        }}>
                    <Text style={appStyles.colorBlack}>Account Payment</Text>
                </Button>
                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.updatePaymentType(bid.get("id"), "COD");
                        }}>
                    <Text style={appStyles.colorBlack}>Invoice Paid (COD)</Text>
                </Button>
            </View>
        )
    }

    showReleaseButton(bid) {
        return (
            <View style={[appStyles.button, appStyles.buttonPrimary]}>
                <Button style={appStyles.justifyItemsCenter} onPress={() => {
                    this.props.releaseOrder(bid.get("id"));
                    Alert.alert("Order Release", "Order has been released");
                }}>
                    <Text style={appStyles.colorBlack}>Release</Text>
                </Button>
            </View>
        )
    }

    getSingleBid(bid_id) {
        let accepted_bids = this.props.bid.get("accepted_bids").get("data");
        return accepted_bids.find((bid) => bid.get("id") === bid_id);
    }

    showBidButton(bid) {
        if (bid) {
            let status=bid.get("order").get("status");
            return status!== "Complete" && status !== "Cancelled"
                ? this.showAwaitingButton(bid) : null;
        }
        else{
            return null;
        }
    }


    render() {
        let bid = this.getSingleBid(this.props.navigation.getParam("bid_id"));
        let quantity=parseFloat(bid.get("order").get("order_concrete").get("quantity"));
        let price=parseFloat(bid.get("price"));
        bid=bid.set("total",quantity*price);
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title={"Bid Status"}/>
                    <Content style={appStyles.bottomMarginDefault}>
                        <View style={[appStyles.bgWhite, appStyles.mb_10]}>
                            <TableRow rowData={bid} rowColumns={this.state.rowColumns}/>
                        </View>
                        {this.showBidButton(bid)}
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepAcceptedBids: () => {
            return dispatch(actions.bid.getRepAcceptedBids())
        },
        updatePaymentType: (bid_id, payment_type) => {
            return dispatch(actions.order.updatePaymentType(bid_id, payment_type));
        },
        cancelOrder: (order_id) => {
            return dispatch(actions.order.repCancelOrder(order_id));
        },
        releaseOrder: (bid_id) => {
            return dispatch(actions.order.repReleaseOrder(bid_id));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        bid: state.get("bid")
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AcceptedBidDetail));
