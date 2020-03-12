import * as React from 'react';

import {View, Button, Text, Content, Col, Row} from 'native-base';
import {ScrollView} from "react-native";
import {appStyles} from "../../../../../assets/styles/app_styles";
import AppHeader from "../../../../components/Headers/AppHeader";
import SubHeader from "../../../../components/Headers/SubHeader";
import AppBackground from "../../../../components/App/AppBackground";
import EmptyTable from "../../../../components/Basic/Tables/EmptyTable";
import {formatDate, formatTime} from "../../../../helpers/time";
import TableRow from "../../../../components/Basic/Tables/TableRow";
import {actions} from "../../../../store/modules";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

class PreviousOrderDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            rowColumns: [
                {
                    title:"Address",
                    key:"address"
                },
                {
                    title: "Post Code",
                    key: "post_code"
                },
                {
                    title: "Suburb",
                    key: "suburb"
                },
                {
                    title:"State",
                    key:"state"
                },
                {
                    title: "Quantity",
                    key: "quantity"
                },

                {
                    title: "Type",
                    key: "type"
                },
                {
                    title: "MPA",
                    key: "mpa"
                },
                {
                    title: "Slump",
                    key: "slump"
                },
                {
                    title: "ACC",
                    key: "acc"
                },
                {
                    title: "Placement Type",
                    key: "placement_type"
                },
                {
                    key: "delivery_date",
                    title: "Preference 1",
                    format: formatDate,
                    secondValue: "time_preference1",
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {
                    key: "delivery_date1",
                    secondValue: "time_preference2",
                    title: "Preference 2",
                    format: formatDate,
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {
                    key: "delivery_date2",
                    secondValue: "time_preference3",
                    title: "Preference 3",
                    format: formatDate,
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {
                    title: "Time Urgency",
                    key: "urgency"
                },
                {
                    title: "Message Required",
                    key: "message_required"
                },
                {
                    title: "On Site / On Call",
                    key: "preference"
                },
            ]
        };
        this.focusListener = this.props.navigation.addListener("willFocus", () => {
            this.props.getPreviousOrders();
        });
        this.blurListener = this.props.navigation.addListener('willBlur', () => {
            this.props.stopGettingPreviousOrders();
        });
    }

    showContent(){
        let order_id=this.props.navigation.getParam("order_id");
        let order = this.props.previous_orders?.get("data")?.get("entities")?.get("order_concrete")?.get(order_id?.toString());
        // console.log(order);
        return typeof order==="undefined"
                ?<EmptyTable emptyMsg={"This order has been archived"} />
                :<TableRow rowData={order} rowColumns={this.state.rowColumns}/>;
    }

    render(){
        return (
            <AppBackground disableBack alignTop>
                <ScrollView contentContainerStyle={[appStyles.flexGrow]} style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="prev-order" title="Order Details"/>
                    <View>
                        {this.showContent()}
                    </View>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPreviousOrders: () => {
            return dispatch(actions.previous_orders.fetchPreviousOrders());
        },
        stopGettingPreviousOrders: () => {
            return dispatch(actions.previous_orders.stopFetchingPreviousOrders());
        }
    }
};


const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        previous_orders: state.get("previous_orders")
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(PreviousOrderDetail));