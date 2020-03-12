import * as React from 'react';
import {Content, View} from "native-base";
import AppBackground from "../../../../components/App/AppBackground";
import AppHeader from "../../../../components/Headers/AppHeader";
import TableRow from "../../../../components/Basic/Tables/TableRow";
import SubHeader from "../../../../components/Headers/SubHeader";
import {appStyles} from "../../../../../assets/styles/app_styles";
import {ScrollView} from "react-native";
import {formatTime, formatDate} from "../../../../helpers/time";
import AppFooter from "../../../../components/App/Footer/AppFooter";

export default class ViewOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {
                    title:"Job Id",
                    key:"job_id"
                },
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