import * as React from 'react';
import {Content, View} from "native-base";
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import TableRow from "../../../components/Tables/TableRow";
import SubHeader from "../../../components/Headers/SubHeader";
import {appStyles} from "../../../../assets/styles/app_styles";
import {ScrollView} from "react-native";
import {formatTime, formatDate} from "../../../helpers/time";
import AppFooter from "../../../components/Footer/AppFooter";

export default class ViewOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                    title: "Delivery Preference 1",
                    key: "delivery_date",
                    format:formatDate
                },
                {
                    title: "Delivery Preference 2",
                    key: "delivery_date1",
                    format:formatDate
                },
                {
                    title: "Delivery Preference 3",
                    key: "delivery_date2",
                    format:formatDate
                },
                {
                    title: "Time Preference 1",
                    key: "time_preference1",
                    format:formatTime
                },
                {
                    title: "Time Preference 2",
                    key: "time_preference2",
                    format:formatTime
                },
                {
                    title: "Time Preference 3",
                    key: "time_preference3",
                    format:formatTime
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
        let order_concrete = this.props.navigation.getParam("order_concrete");
        return (
            <AppBackground>
                <AppHeader/>
                <ScrollView>
                    <SubHeader title="Order Details" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite, appStyles.bottomMarginDefault]}>
                        <View style={[appStyles.p_5]}>
                            <TableRow rowData={order_concrete} rowColumns={this.state.rowColumns}/>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}