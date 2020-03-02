import * as React from 'react';
import {ScrollView, Linking, Alert} from 'react-native';
import {Button, Text, Content, View} from 'native-base';

import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/App/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";

import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import TableRow from "../../../components/Basic/Tables/TableRow";

import {boolToAffirmative} from "../../../helpers/app";
import {formatDate, formatTime, formatPrice} from "../../../helpers/time";
import CustomButton from "../../../components/Basic/Button/CustomButton";
import AppFooter from "../../../components/App/Footer/AppFooter";
import EmptyTable from "../../../components/Basic/Tables/EmptyTable";
import {resetNavigation} from "../../../helpers/navigationHelper";
import CancelModel from "../../../components/Basic/Modal/CancelModal";


class AcceptedBidDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"Reschedule Order",
            cancelModalVisibility:false,
            rowColumns: [
                {title:"Job No.",key:"order.job_id"},
                {title: "Job Delivery Date", key: "date_delivery", format: formatDate},
                {title: "Job Delivery Time", key: "time_delivery", format: formatTime},
                {title:"Job Status",key:"order.status"},
                {title: "Payment Method", key: "payment_type"},
                {title: "Price Per M3", key: "price", format: formatPrice},
                {title: "Required M3", key: "order.order_concrete.quantity"},
                {title: "Total Amount", key: "total", format: formatPrice},
                {title: "Address", key: "order.order_concrete.address"},
                {title: "Post Code", key: "order.order_concrete.post_code"},
                {title: "Suburb", key: "order.order_concrete.suburb"},
                {title: "State", key: "order.order_concrete.state"},
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
            ],
            emptyMessage: "This job has already been completed or cancelled."
        };

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepAcceptedBids();
            this.interval = setInterval(() => {
                this.props.getRepAcceptedBids();
            }, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', (payload) => {
            clearInterval(this.interval);
        });

        this.onCancelModelClick=this.onCancelModelClick.bind(this);
        this.onModelClick=this.onModelClick.bind(this);
        this.getSingleBid = this.getSingleBid.bind(this);
    }

    componentDidMount() {
        this.props.getRepAcceptedBids();
    }

    componentWillUnmount() {
        this.props.navigation.addListener('didFocus', (payload) => {
            clearInterval(this.interval);
        });
    }

    showAwaitingButton(bid) {
        let status = bid.get("order").get("status");
        return (
            <View>
                {this.showPaidButton(bid)}
                {this.showReleaseButton(bid)}
                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.navigation.navigate("Rep View Message", {
                                message: bid.get("order").get("message"),
                                bid_id: bid.get("id")
                            });
                        }}>
                    <Text style={[appStyles.colorBlack, appStyles.customFont, appStyles.boldFont]}>
                        View Message/Balance of Order
                    </Text>
                </Button>

                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.navigation.navigate("Rep User Contact Detail", {
                                user: bid.get("order").get("user")
                            });
                        }}>
                    <Text style={[appStyles.colorBlack, appStyles.customFont, appStyles.boldFont]}>
                        Contact Contractor
                    </Text>
                </Button>


                <Button danger style={[appStyles.button, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.setState({cancelModalVisibility: true});
                        }}>
                    <Text style={[appStyles.colorBlack, appStyles.customFont, appStyles.boldFont]}>Reschedule
                        Order</Text>
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
                    <Text style={[appStyles.colorBlack, appStyles.customFont, appStyles.boldFont]}>Account
                        Payment</Text>
                </Button>
                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.justifyItemsCenter]}
                        onPress={() => {
                            this.props.updatePaymentType(bid.get("id"), "Paid");
                        }}>
                    <Text style={[appStyles.colorBlack, appStyles.customFont, appStyles.boldFont]}>Invoice Paid</Text>
                </Button>
            </View>
        )
    }

    showPaidButton(bid) {
        return (
            <View>
                <CustomButton btnText={"Invoice Paid"} onPress={() => {
                    this.props.updatePaymentType(bid.get("id"), "Paid");
                    Alert.alert("Order Paid", "Order has been marked as Paid");
                }}/>
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
                    <Text style={[appStyles.colorBlack, appStyles.customFont, appStyles.boldFont]}>Release</Text>
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
            let status = bid.get("order").get("status");
            return status !== "Complete" && status !== "Cancelled"
                ? this.showAwaitingButton(bid) : null;
        } else {
            return null;
        }
    }

    onCancelModelClick() {
        this.setState({cancelModalVisibility: false});
    }

    onModelClick(bid){
        this.props.cancelOrder(bid.get("order").get("id"));
        this.setState({cancelModalVisibility: false});
    }


    render() {
        let bid = this.getSingleBid(this.props.navigation.getParam("bid_id"));
        if (bid) {
            let quantity = parseFloat(bid.get("order").get("order_concrete").get("quantity"));
            let price = parseFloat(bid.get("price"));
            bid = bid.set("total", quantity * price);
        }
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title={"Bid Status"}/>
                    <Content style={appStyles.bottomMarginDefault}>
                        {typeof bid === "undefined" ?
                            <View>
                                <EmptyTable message={this.state.emptyMessage}/>
                                <CustomButton btnText={"View Previous Jobs"} onPress={()=>{
                                    this.props.appLoading();
                                    resetNavigation("Previous Bid List", "Previous Bids");
                                }} />
                            </View>
                            : (
                                <View>
                                    <View style={[appStyles.bgWhite, appStyles.mb_10]}>
                                        <TableRow rowData={bid} rowColumns={this.state.rowColumns}/>
                                    </View>
                                    {this.showBidButton(bid)}
                                </View>
                            )}
                            <CancelModel title={this.state.title} onClickParams={bid}
                                     modalVisibility={this.state.cancelModalVisibility}
                                     onModalClick={this.onModelClick} onModalCancelClick={this.onCancelModelClick}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appLoading:()=>{
            return dispatch(actions.app.loading(true));
        },
        getRepAcceptedBids: () => {
            return dispatch(actions.bid.getRepAcceptedBids())
        },
        updatePaymentType: (bid_id, status) => {
            return dispatch(actions.order.updatePaymentType(bid_id, status));
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
