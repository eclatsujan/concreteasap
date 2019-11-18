import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Col, Row} from 'native-base';

import moment from "moment";
import {connect} from 'react-redux';

import {actions} from '../../../store';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../assets/app_styles";
import {styles} from '../styles.js';
import TableRow from "../../../components/Tables/TableRow";

class ReviewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "rowColumns": [
                {key: "suburb", title: "Post Code"}, {key: "quantity", title: "Quantity"}, {key: "type", title: "Type"},
                {key: "mpa", title: "MPA"}, {key: "agg", title: "AGG"}, {key: "slu", title: "Slump"},
                {key: "acc", title: "ACC"}, {key: "placement_type", title: "Placement Type"},
                {key: "message_required", title: "Message Required"},
                {key: "delivery_date", title: "Date Preference 1"}, {key: "delivery_date1", title: "Date Preference 2"},
                {key: "delivery_date2", title: "Date Preference 3"}, {key: "time1", title: "Time Preference 1"},
                {key: "time2", title: "Time Preference 2"}, {key: "time3", title: "Time Preference 3"},
                {key: "time_difference_deliveries", title: "Time Between  Deliveries"},
                {key: "urgency", title: "Time Urgency"}, {key: "site_call", title: "On Site/On Call"},
            ]
        };
        this.nextActions = this.nextActions.bind(this);
    }

    formatDate(date, defaultFormat = "YYYY-MM-DD") {
        return moment(date, "DD/MM/YYYY").format(defaultFormat).toString();
    }

    nextActions(order, special) {
        let full_order = {};
        let order_id = this.props.navigation.getParam("order_id");
        full_order["suburb"] = order.suburb;
        full_order["type"] = order.type;
        full_order["mpa"] = order.mpa;
        full_order["agg"] = order.agg;
        full_order["slump"] = order.slu;
        full_order["acc"] = order.acc;
        full_order["placement_type"] = order.placement_type;
        full_order["quantity"] = order.quantity;
        full_order["delivery_date"] = this.formatDate(order.delivery_date);
        full_order["delivery_date1"] = this.formatDate(order.delivery_date1);
        full_order["delivery_date2"] = this.formatDate(order.delivery_date2);
        full_order["time_preference1"] = order.time1;
        full_order["time_preference2"] = order.time2;
        full_order["time_preference3"] = order.time3;
        full_order["time_deliveries"] = order.time_difference_deliveries;
        full_order["urgency"] = order.urgency;
        full_order["message_required"] = order.message_required;
        full_order["preference"] = order.site_call;
        full_order["colours"] = order.colours;
        // console.log(special);
        full_order["specialInstructions"] = order.message_required === "Yes" ? special["special_instructions"] : "";
        full_order["deliveryInstructions"] = order.message_required === "Yes" ? special["delivery_instructions"] : "";

        console.log(this.props.navigation);

        // if (order.message_required !== "No") {
        //     this.props.navigation.navigate("ReviewInstructions", {
        //         full_order,order_id
        //     })
        // } else {
        //     this.submitForm(full_order,order_id);
        // }

    }

    submitForm(order, order_id) {
        if (order_id) {
            order["order_id"] = order_id;
            this.props.modifyOrder(order);
        } else {
            this.props.createOrder(order);
        }
    }

    render() {
        /* 2. Read the params from the navigation state */
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;
        const special = params ? params.special : null;
        let app = this.props.app.toJS();

        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader backMenu/>
                    <Content contentContainerStyle={[styles.content]}>
                        <SubHeader iconName="search" title="Review Order"/>
                        <View style={[appStyles.bgWhite, appStyles.p_15]}>
                            <TableRow rowData={order} rowColumns={this.state.rowColumns}/>
                        </View>
                        <View style={appStyles.my_5}>
                            <Button style={[appStyles.button, appStyles.bgPrimary, appStyles.horizontalCenter]}
                                    onPress={() => this.nextActions(order, special)}>
                                <Text style={appStyles.colorBlack}>
                                    {order.message_required === "No" ? "NEXT" : "NEXT"}
                                </Text>
                            </Button>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (order) => {
            return dispatch(actions.order.createOrder(order))
        },
        modifyOrder: (order) => {
            return dispatch(actions.order.modifyOrder(order));
        }
    }
};

const mapStateToProps = (state) => {
    // const {order, error, app} = state;
    return {
        order: state.get("order"),
        error: state.get("error"),
        app: state.get("app")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
