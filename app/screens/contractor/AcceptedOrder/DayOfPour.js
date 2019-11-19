import * as React from 'react';
import {ScrollView} from 'react-native';
import {Col, Row, Button, Text, Content, View, Icon} from 'native-base';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//styles
import {appStyles} from "../../assets/app_styles";
import {actions} from "../../../store/modules";


class DayOfPour extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            "loading":true
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.setState({loading: true});
            let order_id = this.props.navigation.getParam("order_id");
            this.props.getSingleAcceptedOrder(order_id);
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    displayRow(title, value) {
        return (
            <Row>
                <Col>
                    <Text>{title}</Text>
                </Col>
                <Col>
                    <Text>{value}</Text>
                </Col>
            </Row>);
    }

    viewFullOrder(order) {
        // console.log(this.props.navigation);
        this.props.navigation.navigate("ViewFullOrderDetails", {
            order: order.current_order
        });

    }

    render() {
        let order = this.props.order.toJS();
        let app = this.props.app.toJS();
        let concrete_order = order.current_order["order_concrete"] ? order.current_order["order_concrete"] : {};
        let bid = order.current_order.bids ? order.current_order.bids[0] : {};
        let order_id=order["current_order"]["id"];
        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Active Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.viewFullOrder(order)}>
                            <Icon style={[appStyles.colorBlack]} type="FontAwesome" name="eye"/>
                            <Text style={[appStyles.colorBlack]}>View Full Order Details</Text>
                        </Button>
                        <View style={[appStyles.bgWhite, appStyles.my_10, appStyles.p_5]}>
                            {this.displayRow("On Site/On Call", concrete_order["preference"])}
                            {this.displayRow("Total Amount", "$" + bid["price"])}
                            {this.displayRow("Order Number", order_id)}
                            {this.displayRow("Delivery Date", concrete_order["delivery_date"])}
                            {this.displayRow("Time Preference", concrete_order["time_preference1"])}
                            {this.displayRow("Suburb", concrete_order["suburb"])}
                        </View>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.props.confirmDelivery(order.current_order["id"],{
                                    order_id
                                })}>
                            <Text style={[appStyles.colorBlack]}>Confirm Order Delivery</Text>
                        </Button>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.props.navigation.navigate("modifyOrder",{
                                    order_id
                                })}>
                            <Text style={[appStyles.colorBlack]}>Modify Order</Text>
                        </Button>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.props.navigation.navigate("OrderReview",{
                                    order_id
                                })}>
                            <Text style={[appStyles.colorBlack]}>Complete Order</Text>
                        </Button>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}>
                            <Text style={[appStyles.colorBlack]}>Contact Rep</Text>
                        </Button>
                        <Button danger style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.props.cancelOrder(order.current_order["id"])}>
                            <Text style={[appStyles.colorBlack]}>Cancel Order</Text>
                        </Button>
                    </Content>

                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleAcceptedOrder: (order_id) => {
            return dispatch(actions.order.getSingleAcceptedOrder(order_id))
        },
        cancelOrder: (order_id) => {
            return dispatch(actions.order.contractorCancelOrder(order_id))
        },
        confirmDelivery: (order_id) => {
            return dispatch(actions.order.confirmOrderDelivery(order_id));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DayOfPour));