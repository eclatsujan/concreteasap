import * as React from 'react';
import AppBackground from "../../../../components/AppBackground";
import {ScrollView, TouchableWithoutFeedback} from 'react-native';
import {Row, View, Col, Toast, Button, Text, Content, Icon} from "native-base";
import connect from "react-redux/lib/connect/connect";
import SubHeader from "../../../../components/Headers/SubHeader";
import AppHeader from "../../../../components/Headers/AppHeader";
import OrderMessageForm from "../../../../components/contractor/OrderMessageForm";
import {actions} from "../../../../store/modules";
import {appStyles} from "../../../../../assets/styles/app_styles";
import {OrderMessageView} from "../../../../components/contractor/OrderMessageView";
import CustomButton from "../../../../components/Button/CustomButton";
import EmptyTable from "../../../../components/Tables/EmptyTable";

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

        // this.focusListener = this.props.navigation.addListener('didFocus', () => {
        //     this.interval = setInterval(this.props.getAcceptedOrder, 4000);
        // });
        //
        // this.blurListener = this.props.navigation.addListener('didBlur', () => {
        //     clearInterval(this.interval);
        // });

        this.getPourOrder = this.getPourOrder.bind(this);
    }


    showLabel(message, order_id, order_type, order) {
        let price = !message?.get("price") ? 0 : message?.get("price");
        let status = !message?.get("status") ? "" : message?.get("status");

        return (
            <OrderMessageView status={status} quantity={message?.get("quantity")} price={price}
                              acceptMessage={() => {
                                  this.props.sendOrderMessageStatus(order_id, "Accepted", order_type)
                              }}
                              rejectMessage={() => {
                                  this.props.sendOrderMessageStatus(order_id, "Rejected", order_type)
                              }}/>
        );
    }

    getPourOrder(order_id, order_type = "accepted_orders") {
        return this.props.order.get(order_type).get("data").find((order) => {
            return order?.get("id") === order_id;
        });
    }

    onComplete(order, order_id, order_type) {
        return this.props.navigation.navigate("Confirm Review", {
            order, order_id, order_type
        });
    }

    showMessages(messages) {

    }


    render() {
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = this.props.navigation.getParam("order_type");

        let order = this.getPourOrder(order_id, order_type);
        let messages = order?.get("message");
        console.log(messages);
        return (
            <AppBackground loading={this.props.app.get("loading")} enableKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Message/Balance of Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <View>
                        <Row>
                            <Col>
                                {messages.length > 0 ? this.showMessages(messages) :
                                    <EmptyTable message={this.state.emptyMessage}/>}
                                <CustomButton onPress={() => {
                                    this.onComplete(order, order_id, order_type)
                                }} btnText={"Complete Order"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CustomButton onPress={() => {
                                    console.log("ok");
                                    this.props.navigation.navigate("Order Message Detail", {
                                        order_id,
                                        order_type
                                    })
                                }} btnText={"Add Another Message"}/>
                            </Col>
                        </Row>
                    </View>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAcceptedOrder: () => {
            return dispatch(actions.order.getContractorAcceptedOrder())
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