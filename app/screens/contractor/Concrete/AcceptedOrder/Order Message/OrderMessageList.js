import * as React from 'react';
import AppBackground from "../../../../../components/App/AppBackground";
import {ScrollView, TouchableWithoutFeedback, BackHandler} from 'react-native';
import {Row, View, Col, Toast, Button, Text, Content, Icon} from "native-base";
import connect from "react-redux/lib/connect/connect";
import SubHeader from "../../../../../components/Headers/SubHeader";
import AppHeader from "../../../../../components/Headers/AppHeader";
import OrderMessageForm from "../../../../../components/contractor/Concrete/Message/OrderMessageForm";
import {actions} from "../../../../../store/modules";
import {appStyles} from "../../../../../../assets/styles/app_styles";
import {OrderMessageView} from "../../../../../components/contractor/Concrete/Message/OrderMessageView";
import CustomButton from "../../../../../components/Basic/Button/CustomButton";
import EmptyTable from "../../../../../components/Basic/Tables/EmptyTable";
import AppFooter from "../../../../../components/App/Footer/AppFooter";
import {resetNavigation} from "../../../../../helpers/navigationHelper";

class OrderMessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                quantity: "",
                total: "0",
                message_m3: "0",
                message_total: "0",
                total_m3: "0",
                total_amount: "0"
            },
            emptyMessage: "There is no message found."
        };
        this.onComplete = this.onComplete.bind(this);
        this.onBack = this.onBack.bind(this);
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            this.props.getPourOrders();

            this.interval = setInterval(() => {
                this.props.getPourOrders();
            }, 10000);
        });

        this.blurListener = this.props.navigation.addListener('willBlur', () => {
            clearInterval(this.interval);
        });
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', () => {
            return this.onBack();
        });

    }


    showMessages(messages, order_id, order_type) {
        let loading = this.props.app.get("loading");
        return messages.map((message, index) => {
            let price = !message.get("price") ? 0 : message?.get("price");
            return (
                <OrderMessageView loading={loading} key={index} quantity={message.get("quantity")} price={price}
                                  status={message?.get("status")}
                                  acceptMessage={() => this.props.sendOrderMessageStatus(message.get("id"), "Accepted", order_type, order_id)}
                                  rejectMessage={() => this.props.sendOrderMessageStatus(message.get("id"), "Rejected", order_type, order_id)}/>
            );
        });
    }

    getPourOrder(order_id, order_type) {
        return this.props.order.get(order_type)?.get("data").find((order) => {

            return order.get("id") === order_id;
        });
    }

    onComplete(order, order_id, order_type) {
        let initialValues = {};

        const order_concrete = order?.get("order_concrete");
        const bids = order?.get("bids").get(0);

        let messages = order?.get("message");

        let quantity = order_concrete?.get("quantity");
        let total = (order_concrete?.get("quantity") * bids?.get("price"));

        let message_m3 = 0;
        let message_total = 0;

        messages?.forEach((message, index) => {
            if (message.get("status") === "Accepted") {
                let total = !parseFloat(message?.get("price")) || message?.get("price") === "" ? 0 : parseFloat(message?.get("price"));
                message_m3 += parseFloat(message?.get("quantity"));
                message_total += parseFloat(total);
            }
        });

        let total_m3 = parseFloat(quantity) + message_m3;

        initialValues.quantity = quantity.toString();
        initialValues.total = total?.toString();
        initialValues.message_m3 = message_m3.toString();
        initialValues.message_total = message_total.toString();
        initialValues.total_m3 = total_m3.toString();
        initialValues.total_amount = (total + message_total).toString();

        return this.props.navigation.navigate("Confirm Review", {
            order, order_id, order_type, initialValues
        });
    }

    onBack() {
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = typeof this.props.navigation.getParam("order_type") === "undefined" ? "accepted_orders" : this.props.navigation.getParam("order_type");
        let order = this.getPourOrder(order_id, order_type);

        return typeof order!=="undefined"
                ?this.props.navigation.navigate("DayOfPour", this.props.navigation.state?.params)
                :this.props.navigation.navigate("Notifications");
    }

    render() {
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = typeof this.props.navigation.getParam("order_type") === "undefined" ? "accepted_orders" : this.props.navigation.getParam("order_type");
        let order = this.getPourOrder(order_id, order_type);

        let messages = order?.get("message");
        let size=typeof messages!=="undefined"?messages?.size:0;
        let btnText=size===0?"Add Message":"Add Another Message";
        return (
            <AppBackground loading={this.props.app.get("loading")} enableKeyBoard backBtnClick={this.onBack}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Message/Balance of Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    {typeof order === "undefined" ? (
                        <View>
                            <EmptyTable message={"This order has been completed or cancelled."} />
                            <CustomButton btnText={"View Orders"} onPress={()=>{
                                this.props.appLoading();
                                resetNavigation("ViewOrderBids","Pending Orders")
                            }} />
                        </View>
                    ) : (
                        <View>
                            <Row>
                                <Col>
                                    {messages?.size > 0 ? this.showMessages(messages, order_id, order_type) :
                                        <EmptyTable message={this.state.emptyMessage}/>}
                                    <CustomButton onPress={() => {
                                        this.onComplete(order, order_id, order_type)
                                    }} btnText={"Complete Order"}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CustomButton onPress={() => {
                                        this.props.navigation.navigate("Order Message Detail", {
                                            order_id,
                                            order_type
                                        })
                                    }} btnText={btnText}/>
                                </Col>
                            </Row>
                        </View>
                    )
                    }

                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAcceptedOrder: () => {
            return dispatch(actions.order.getContractorAcceptedOrder())
        },
        sendOrderMessageStatus(message_id, status, order_type, order_id) {
            return dispatch(actions.order.sendOrderMessageStatus(message_id, status, order_type, order_id))
        },
        getPourOrders: () => {
            return dispatch(actions.order.getContractorAllPour());
        },
        appLoading: () => {
            return dispatch(actions.app.loading());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        alerts: state.get("alert"),
        order: state.get("order"),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderMessageList);