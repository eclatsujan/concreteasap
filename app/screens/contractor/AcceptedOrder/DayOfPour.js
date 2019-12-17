import * as React from 'react';
import {BackHandler, ScrollView} from 'react-native';
import {Col, Row, Button, Text, Content, View, Icon} from 'native-base';
import {NavigationActions, withNavigation, withNavigationFocus} from "react-navigation";
import {connect} from "react-redux";

import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//styles
import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import {formatDate, formatTime} from "../../../helpers/time";
import CancelModel from "../../../components/Modal/CancelModal";

class DayOfPour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "loading": true,
            "cancelModalVisibility": false,
            "title": "Are you sure to cancel order?"
        };
        this.getPourOrder=this.getPourOrder.bind(this);
        this.handleBackButtonPressAndroid = this.handleBackButtonPressAndroid.bind(this);
        this.onCancelModelClick = this.onCancelModelClick.bind(this);
        this.onModelClick = this.onModelClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPressAndroid);
    }

    componentWillUnmount() {
        // Remove the event listener
        // this.focusListener.remove();
    }

    handleBackButtonPressAndroid() {
        if (!this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: "pourDayList"}));
        return false;
    }

    displayRow(title, value) {
        return (
            <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                <Col>
                    <Text style={[appStyles.boldFont]}>{title}</Text>
                </Col>
                <Col>
                    <Text>{value}</Text>
                </Col>
            </Row>);
    }

    viewFullOrder(order) {
        this.props.navigation.navigate("ViewFullOrderDetails", {
            order: order
        });
    }

    viewContactDetail(user) {
        this.props.navigation.navigate("User Contact Detail", {
            user
        });
    }

    getPourOrder(order_id, order_type = "accepted_orders") {
        return this.props.order.get(order_type).get("data").find((order) => {
            return order.get("id") === order_id;
        });
    }

    onModelClick(order) {
        this.props.cancelOrder(order?.["id"]);
        this.setState({cancelModalVisibility: false});
    }

    onCancelModelClick() {
        this.setState({cancelModalVisibility: false});
    }

    render() {
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = this.props.navigation.getParam("order_type") ? this.props.navigation.getParam("order_type") : "accepted_orders";
        let order = this.getPourOrder(order_id, order_type);
        let concrete_order = order?.get("order_concrete") ? order?.get("order_concrete") : null;
        let bid = order?.get("bids") ? order?.get("bids").get(0) : null;
        let user = bid ? bid?.get("user") : null;

        let price=parseFloat(bid?.get("price"));
        let quantity=parseFloat(concrete_order?.get("quantity"));
        let total=price*quantity;

        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Active Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter, appStyles.flexRow]}
                                onPress={() => this.viewFullOrder(order)}>
                            <Icon style={[appStyles.colorBlack]} type="FontAwesome" name="eye"/>
                            <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                View Full Order Details
                            </Text>
                        </Button>
                        <View style={[appStyles.bgWhite, appStyles.my_10, appStyles.p_10, appStyles.p_5]}>
                            {this.displayRow("Order Number", order_id)}
                            {this.displayRow("Price Per M3", "$" + bid?.get("price"))}
                            {this.displayRow("Quantity",concrete_order?.get("quantity"))}
                            {this.displayRow("Total",
                                "$" + total)}
                            {this.displayRow("Delivery Date", formatDate(bid?.get("date_delivery")))}
                            {this.displayRow("Time Preference", formatTime(bid?.get("time_delivery")))}
                            {this.displayRow("On Site/On Call", concrete_order?.get("preference"))}
                            {this.displayRow("Address", concrete_order?.get("address"))}
                            {this.displayRow("Suburb", concrete_order?.get("suburb"))}
                        </View>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.props.navigation.navigate("modifyOrder", {
                                    order_id,
                                })}>
                            <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                Modify Order
                            </Text>
                        </Button>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.props.navigation.navigate("Confirm Review", {
                                    order_id,
                                    total,
                                    quantity,
                                    price
                                })}>
                            <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                Complete Order
                            </Text>
                        </Button>
                        <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.viewContactDetail(user)}>
                            <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                Contact Rep
                            </Text>
                        </Button>
                        <Button danger style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                                onPress={() => this.setState({cancelModalVisibility: true})}>
                            <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                                Cancel Order
                            </Text>
                        </Button>
                        <CancelModel title={this.state.title} onClickParams={order}
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
        cancelOrder: (order_id) => {
            return dispatch(actions.order.contractorCancelOrder(order_id))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(DayOfPour));