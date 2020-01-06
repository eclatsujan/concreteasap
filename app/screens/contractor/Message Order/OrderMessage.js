import * as React from 'react';
import AppBackground from "../../../components/AppBackground";
import {ScrollView} from 'react-native';
import {Row, View, Col, Toast, Button, Text, Content} from "native-base";
import connect from "react-redux/lib/connect/connect";
import SubHeader from "../../../components/Headers/SubHeader";
import AppHeader from "../../../components/Headers/AppHeader";
import OrderMessageForm from "../../../components/contractor/OrderMessageForm";
import {actions} from "../../../store/modules";
import {appStyles} from "../../../../assets/styles/app_styles";

class OrderMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                quantity: "0",
                total: "0",
                message_m3: "0",
                message_total: "0",
                total_m3: "0",
                total_amount: "0"
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        let initialValues = {...state.initialValues};

        if (props.navigation.getParam("total_quantity")) {
            initialValues.quantity = props.navigation.getParam("total_quantity").toString();
        }

        return {
            initialValues
        };
    }

    onSubmit(values) {
        let quantity = values.get("quantity");
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = this.props.navigation.getParam("order_type");
        this.props.dispatch(actions.order.sendOrderMessage(order_id, quantity, order_type));
    }

    showLabel(message) {
        let price=!message?.get("price")?0:message?.get("price");
        return (
            <View>
                <View style={[appStyles.bgWhite, appStyles.p_10]}>
                    <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                        <Col>
                            <Text style={appStyles.boldFont}>Quantity (m3)</Text>
                        </Col>
                        <Col>
                            <Text>{message?.get("quantity")}</Text>
                        </Col>
                    </Row>
                    <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                        <Col>
                            <Text style={appStyles.boldFont}>Total</Text>
                        </Col>
                        <Col>
                            <Text>{price}</Text>
                        </Col>
                    </Row>
                </View>
            </View>
        );
    }

    render() {
        let order = this.props.navigation.getParam("order");
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = this.props.navigation.getParam("order_type");
        let total = this.props.navigation.getParam("total");
        let quantity = this.props.navigation.getParam("quantity");
        let price = this.props.navigation.getParam("price");
        return (
            <AppBackground loading={this.props.app.get("loading")} enableKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Message/Balance of Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <View>
                        <Row>
                            <Col>
                                {order?.get("message") ?
                                    this.showLabel(order?.get("message")) :
                                    <OrderMessageForm onSubmit={this.onSubmit} backRoute={"Order Message"}
                                                      initialValues={this.state.initialValues}
                                                      calculatorRoute={"Modify Order Calculator"}/>
                                }
                                <View>
                                    <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                            onPress={() =>
                                                this.props.navigation.navigate("Confirm Review", {
                                                    order,order_id, order_type
                                                })
                                            }>
                                        <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                            Complete Order
                                        </Text>
                                    </Button>
                                </View>
                            </Col>
                        </Row>
                    </View>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        alerts: state.get("alert")
    };
};


export default connect(mapStateToProps, null)(OrderMessage);