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
import AppFooter from "../../../../components/Footer/AppFooter";

class OrderMessageDetail extends React.Component {

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
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        let quantity = values.get("quantity");
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = this.props.navigation.getParam("order_type");
        this.props.sendOrderMessage(order_id, quantity, order_type);
    }

    render() {
        return (
            <AppBackground loading={this.props.app.get("loading")} enableKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Message/Balance of Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <View>
                        <Row>
                            <Col>
                                <OrderMessageForm onSubmit={this.onSubmit} backRoute={"Order Message"}
                                                  initialValues={this.state.initialValues}
                                                  calculatorRoute={"Modify Order Calculator"}/>
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
        },
        sendOrderMessage(order_id, quantity, order_type) {
            return dispatch(actions.order.sendOrderMessage(order_id, quantity, order_type));
        },
        sendOrderMessageStatus(order_id, status, order_type) {
            return dispatch(actions.order.sendOrderMessageStatus(order_id, status, order_type))
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


export default connect(mapStateToProps, mapDispatchToProps)(OrderMessageDetail);