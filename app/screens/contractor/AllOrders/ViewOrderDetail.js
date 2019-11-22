import * as React from 'react';
import {Content, View} from "native-base";
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import TableRow from "../../../components/Tables/TableRow";
import SubHeader from "../../../components/Headers/SubHeader";
import {appStyles} from "../../../../assets/styles/app_styles";
import {ScrollView} from "react-native";

export default class ViewOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {
                    title: "Post Code",
                    key: "suburb"
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
                    title: "Delivery Preference 1",
                    key: "delivery_date"
                },
                {
                    title: "Delivery Preference 2",
                    key: "delivery_date1"
                },
                {
                    title: "Delivery Preference 3",
                    key: "delivery_date2"
                },
                {
                    title: "Time Preference 1",
                    key: "time_preference1"
                },
                {
                    title: "Time Preference 2",
                    key: "time_preference2"
                },
                {
                    title: "Time Preference 3",
                    key: "time_preference3"
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
        }
    }

    render() {
        let order=this.props.navigation.getParam("order");
        return (
            <AppBackground>
                <AppHeader/>
                <SubHeader title="Order Details" iconType="ConcreteASAP" iconName="accepted-order"/>
                <Content style={[appStyles.bgWhite,appStyles.bottomMarginDefault]}>
                    <View style={[appStyles.p_5]}>
                        <TableRow rowData={order["order_concrete"]} rowColumns={this.state.rowColumns}/>
                    </View>
                </Content>
            </AppBackground>
        );
    }
}