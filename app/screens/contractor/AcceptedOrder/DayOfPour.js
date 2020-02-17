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
import CustomButton from "../../../components/Button/CustomButton";
import AppFooter from "../../../components/Footer/AppFooter";
import EmptyTable from "../../../components/Tables/EmptyTable";

class DayOfPour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "loading": true,
            "cancelModalVisibility": false,
            "title": "Are you sure to cancel order?",
            "emptyMsg": "This order has been already completed or cancelled."
        };
        this.getPourOrder = this.getPourOrder.bind(this);
        this.handleBackButtonPressAndroid = this.handleBackButtonPressAndroid.bind(this);
        this.onCancelModelClick = this.onCancelModelClick.bind(this);
        this.onModelClick = this.onModelClick.bind(this);
        this.backButton = this.backButton.bind(this);
        let order_type = typeof this.props.navigation.getParam("order_type") !== "undefined" ? this.props.navigation.getParam("order_type") : "accepted_orders";

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            if(order_type==="accepted_orders"){
                this.props.getAcceptedOrder();
            }
            else{
                this.props.getPourOrders()
            }
            this.interval = setInterval(() => {
                if(order_type==="accepted_orders"){
                    this.props.getAcceptedOrder();
                }
                else{
                    this.props.getPourOrders()
                }
            }, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPressAndroid);
    }

    componentWillUnmount() {
        this.blurListener.remove();
        this.focusListener.remove();
    }

    handleBackButtonPressAndroid() {
        if (!this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: "pourDayList"}));
        return false;
    }

    displayRow(title, value, disableBorder = false) {
        let style = disableBorder ? [appStyles.py_10] : [appStyles.py_10, appStyles.borderBottom, appStyles.borderGray44];
        return (
            <Row style={style}>
                <Col>
                    <Text style={[appStyles.upperCase, appStyles.baseSmallFontSize, appStyles.boldFont]}>{title}</Text>
                </Col>
                <Col>
                    <Text style={[appStyles.arialFont, appStyles.baseSmallFontSize]}>{value}</Text>
                </Col>
            </Row>);
    }

    viewFullOrder(order) {
        this.props.navigation.navigate("Accepted Order Full Detail", {
            order: order
        });
    }

    viewContactDetail(user) {
        this.props.navigation.navigate("User Contact Detail", {
            user
        });
    }

    getPourOrder(order_id, order_type = "accepted_orders") {
        return this.props.order?.get(order_type)?.get("data")?.find((order) => {
            return order?.get("id") === order_id;
        });
    }

    onModelClick(order) {
        let order_type = this.props.navigation.getParam("order_type") ? this.props.navigation.getParam("order_type") : "accepted_orders";
        this.props.cancelOrder(order?.get("id"), order_type);
        this.setState({cancelModalVisibility: false});
    }

    onCancelModelClick() {
        this.setState({cancelModalVisibility: false});
    }

    onRouteModifyOrder(order_id, order_type, total, quantity, price) {
        return this.props.navigation.navigate("modifyOrder", {order_id, order_type, total, quantity, price});
    }

    onRouteMessageList(order_id, order, order_type) {
        return this.props.navigation.navigate("Order Message List", {
            order_id,
            order,
            order_type
        })
    }


    backButton() {
        let backRoute = this.props.navigation.getParam("backRoute");
        this.props.navigation.navigate(backRoute);
    }

    showContent(order, order_type, order_id) {
        let concrete_order = order?.get("order_concrete") ? order?.get("order_concrete") : null;
        let bid = order?.get("bids") ? order?.get("bids").get(0) : null;
        let user = bid ? bid?.get("user") : null;

        let price = parseFloat(bid?.get("price"));
        let quantity = parseFloat(concrete_order?.get("quantity"));
        let total = price * quantity;

        return (
            <Content>
                <Button style={[appStyles.marginDefault, appStyles.horizontalCenter, appStyles.flexRow]}
                        onPress={() => this.viewFullOrder(order)}>
                    <Icon style={[appStyles.colorBlack]} type="FontAwesome" name="eye"/>
                    <Text style={[appStyles.colorBlack, appStyles.arialFont, appStyles.boldFont]}>
                        View Full Order Details
                    </Text>
                </Button>
                <View style={[appStyles.bgWhite, appStyles.my_10, appStyles.p_10, appStyles.p_5]}>
                    {this.displayRow("Job Number", order?.get("job_id"))}
                    {this.displayRow("Price Per M3", "$" + bid?.get("price"))}
                    {this.displayRow("Quantity", concrete_order?.get("quantity"))}
                    {this.displayRow("Total",
                        "$" + total)}
                    {this.displayRow("Delivery Date", formatDate(bid?.get("date_delivery")))}
                    {this.displayRow("Time Preference", formatTime(bid?.get("time_delivery")))}
                    {this.displayRow("On Site/On Call", concrete_order?.get("preference"))}
                    {this.displayRow("Address", concrete_order?.get("address"), true)}
                </View>
                {order_type === "accepted_orders" ?
                    <CustomButton btnText="Modify Order"
                                  onPress={() => this.onRouteModifyOrder(order_id, order_type, total, quantity, price)}/>
                    : null}
                {order_type !== "accepted_orders" ?
                    <CustomButton btnText="Balance of Order/Message"
                                  onPress={() => this.onRouteMessageList(order_id, order, order_type)}/>
                    : null}

                <CustomButton btnText="Contact Rep" onPress={() => this.viewContactDetail(user)}/>

                <CustomButton danger btnText="Cancel Order"
                              onPress={() => this.setState({cancelModalVisibility: true})}/>

                <CancelModel title={this.state.title} onClickParams={order}
                             modalVisibility={this.state.cancelModalVisibility}
                             onModalClick={this.onModelClick} onModalCancelClick={this.onCancelModelClick}/>
            </Content>
        );
    }

    showEmptyContent() {
        return (
            <View>
                <EmptyTable message={this.state.emptyMsg}/>
                <CustomButton btnText={"My Orders"} onPress={() => this.props.navigation.navigate("Pending Orders")}/>
            </View>
        );
    }

    render() {
        let order_id = this.props.navigation.getParam("order_id");
        let order_type = typeof this.props.navigation.getParam("order_type") !== "undefined" ? this.props.navigation.getParam("order_type") : "accepted_orders";
        let order = this.getPourOrder(order_id, order_type);
        return (
            <AppBackground alerts={this.props.alerts} backBtnClick={this.backButton}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Active Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    {typeof order === "undefined" && this.props.order.get(order_type)?.size > 0 ?
                        this.showEmptyContent() : this.showContent(order, order_type, order_id)}
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
        getPourOrders: () => {
            return dispatch(actions.order.getContractorAllPour());
        },
        cancelOrder: (order_id, order_type) => {
            return dispatch(actions.order.contractorCancelOrder(order_id, order_type))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.get("order"),
        app: state.get("app"),
        alerts: state.get("alert")
    };
};

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(DayOfPour));