import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from 'native-base';

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";

import {styles} from '../styles.js';
import {appStyles} from '../../../../assets/styles/app_styles.js';
import TableRow from "../../../components/Tables/TableRow";
import {tableFields} from '../../../config/tableField';
import AppFooter from "../../../components/Footer/AppFooter";


export default class OrderPendingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: props.navigation.state.params.orderDetail, //data from navigation state
            rowColumns: [
                {
                    title: "Post Code",
                    key: "order.order_concrete.suburb"
                },
                {
                    title: "Quantity",
                    key: "order.order_concrete.quantity"
                },

                {
                    title: "Type",
                    key: "order.order_concrete.type"
                },
                {
                    title: "MPA",
                    key: "order.order_concrete.mpa"
                },
                {
                    title: "Slump",
                    key: "order.order_concrete.slump"
                },
                {
                    title: "ACC",
                    key: "order.order_concrete.acc"
                },
                {
                    title: "Placement Type",
                    key: "order.order_concrete.placement_type"
                },
                {
                    title: "Delivery Preference 1",
                    key: "order.order_concrete.delivery_date"
                },
                {
                    title: "Delivery Preference 2",
                    key: "order.order_concrete.delivery_date1"
                },
                {
                    title: "Delivery Preference 3",
                    key: "order.order_concrete.delivery_date2"
                },
                {
                    title: "Time Preference 1",
                    key: "order.order_concrete.time_preference1"
                },
                {
                    title: "Time Preference 2",
                    key: "order.order_concrete.time_preference2"
                },
                {
                    title: "Time Preference 3",
                    key: "order.order_concrete.time_preference3"
                },
                {
                    title: "Time Urgency",
                    key: "order.order_concrete.urgency"
                },
                {
                    title: "Message Required",
                    key: "order.order_concrete.message_required"
                },
                {
                    title: "On Site / On Call",
                    key: "order.order_concrete.preference"
                }
            ]
        };
    }

    componentDidMount() {
    }

    render() {
        let orderDetail = this.props.navigation.state.params.orderDetail;
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Order Details"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_5,appStyles.bottomMarginDefault]}>
                        <TableRow rowData={orderDetail} rowColumns={this.state.rowColumns}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
