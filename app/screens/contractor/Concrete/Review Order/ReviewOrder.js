import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Col, Row} from 'native-base';

import moment from "moment";
import {connect} from 'react-redux';

import {actions} from '../../../../store';

// Custom Component
import AppBackground from '../../../../components/App/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../../../../assets/styles/app_styles";
import {styles} from '../../styles.js';
import TableRow from "../../../../components/Basic/Tables/TableRow";
import {formatDate, formatTime} from "../../../../helpers/time";

import * as Immutable from 'immutable';
import AppFooter from "../../../../components/App/Footer/AppFooter";

class ReviewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "rowColumns": [
                {key: "address", title: "Address"},
                {key: "post_code", title: "Post Code"}, {key: "suburb", title: "Suburb"},
                {key: "state", title: "state"}, {key: "quantity", title: "Quantity"}, {key: "type", title: "Type"},
                {key: "mpa", title: "MPA"}, {key: "agg", title: "AGG"}, {key: "slu", title: "Slump"},
                {key: "acc", title: "ACC"}, {key: "placement_type", title: "Placement Type"},
                {key: "message_required", title: "Message Required"},
                {
                    key: "delivery_date",
                    title: "Preference 1",
                    format: formatDate,
                    secondValue: "time1",
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {
                    key: "delivery_date1",
                    secondValue: "time2",
                    title: "Preference 2",
                    format: formatDate,
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {
                    key: "delivery_date2",
                    secondValue: "time3",
                    title: "Preference 3",
                    format: formatDate,
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {key: "time_difference_deliveries", title: "Time Between  Deliveries"},
                {key: "urgency", title: "Time Urgency"}, {key: "site_call", title: "On Site/On Call"},
            ]
        };
        this.nextActions = this.nextActions.bind(this);
    }

    formatDate(date, timeFormat = "DD/MM/YYYY", defaultFormat = "YYYY-MM-DD") {
        return moment(date, timeFormat).format(defaultFormat).toString();
    }

    nextActions(order, special) {
        let full_order = Immutable.Map({});
        let order_id = this.props.navigation.getParam("order_id");
        let timeFormat = "DD/MM/YYYY";
        if (order_id) {
            timeFormat = "YYYY-MM-DD";
        }

        full_order = full_order.set("address", order.get("address"));
        full_order = full_order.set("post_code", order.get("post_code"));
        full_order = full_order.set("state", order.get("state"));
        full_order = full_order.set("suburb", order.get("suburb"));
        full_order = full_order.set("type", order.get("type"));
        full_order = full_order.set("mpa", order.get("mpa"));
        full_order = full_order.set("agg", order.get("agg"));
        full_order = full_order.set("slump", order.get("slu"));
        full_order = full_order.set("acc", order.get("acc"));
        full_order = full_order.set("placement_type", order.get("placement_type"));
        full_order = full_order.set("quantity", order.get("quantity"));
        full_order = full_order.set("delivery_date", order.get("delivery_date"));
        full_order = full_order.set("delivery_date1", order.get("delivery_date1"));
        full_order = full_order.set("delivery_date2", order.get("delivery_date2"));
        full_order = full_order.set("time_preference1", order.get("time1"));
        full_order = full_order.set("time_preference2", order.get("time2"));
        full_order = full_order.set("time_preference3", order.get("time3"));
        full_order = full_order.set("time_deliveries", order.get("time_difference_deliveries"));
        full_order = full_order.set("urgency", order.get("urgency"));
        full_order = full_order.set("message_required", order.get("message_required") === "No" ? 0 : 1);
        full_order = full_order.set("preference", order.get("site_call"));
        full_order = full_order.set("colours", order.get("colours"));
        // console.log(order.get("message_required"));
        //Special Instructions
        full_order = full_order.set("special_instructions", special?.get("special_instructions"));
        full_order = full_order.set("delivery_instructions", special?.get("delivery_instructions"));

        let order_type = this.props.navigation.getParam("order_type") ? this.props.navigation.getParam("order_type") : "accepted_orders";

        // if (order.get("message_required") !== "No") {
        //
        //
        // } else {
        //     this.submitForm(full_order.toJS(), order_id);
        // }

        if (order_id) {
            this.props.navigation.navigate("ModifyReviewInstructions", {
                full_order, order_id, order_type
            });
        } else {
            this.props.navigation.navigate("ReviewInstructions", {
                full_order,
            });
        }

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
        return (
            <AppBackground loading={this.props.app.get("loading")}>
                <ScrollView>
                    <AppHeader/>
                    <Content contentContainerStyle={[styles.content]}>
                        <SubHeader iconName="search" title="Review Order"/>
                        <View style={[appStyles.bgWhite, appStyles.p_15]}>
                            <TableRow rowData={order} rowColumns={this.state.rowColumns}/>
                        </View>
                        <View style={appStyles.my_5}>
                            <Button style={[appStyles.button, appStyles.bgPrimary, appStyles.horizontalCenter]}
                                    onPress={() => this.nextActions(order, special)}>
                                <Text style={appStyles.colorBlack}>
                                    {order.get("message_required") === "No" ? "NEXT" : "NEXT"}
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
