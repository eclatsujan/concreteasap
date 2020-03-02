import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from 'native-base';

//Custom Components
import AppBackground from "../../../components/App/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";

import {styles} from '../styles.js';
import {appStyles} from '../../../../assets/styles/app_styles.js';
import TableRow from "../../../components/Basic/Tables/TableRow";
import {tableFields} from '../../../config/tableField';
import AppFooter from "../../../components/App/Footer/AppFooter";
import {customFormatDate, formatDate, formatPrice, formatTime} from "../../../helpers/time";
import {boolToAffirmative} from "../../../helpers/app";


export default class PendingBidDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: {}, //data from navigation state
            rowColumns: [
                {title:"Job No.",key:"order.job_id"},
                {title: "Job Delivery Date", key: "date_delivery", format: formatDate},
                {title: "Job Delivery Time", key: "time_delivery", format: formatTime},
                {title:"Job Status",key:"order.status"},
                {title: "Payment Method", key: "payment_type"},
                {title: "Price Per M3", key: "price", format: formatPrice},
                {title: "Required M3", key: "order.order_concrete.quantity"},
                {title: "Total Amount", key: "total", format: formatPrice},
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
                    key: "order.order_concrete.delivery_date",
                    format: formatDate
                },
                {
                    title: "Delivery Preference 2",
                    key: "order.order_concrete.delivery_date1",
                    format: formatDate
                },
                {
                    title: "Delivery Preference 3",
                    key: "order.order_concrete.delivery_date2",
                    format: formatDate
                },
                {
                    title: "Time Preference 1",
                    key: "order.order_concrete.time_preference1",
                    format: formatTime
                },
                {
                    title: "Time Preference 2",
                    key: "order.order_concrete.time_preference2",
                    format: formatTime
                },
                {
                    title: "Time Preference 3",
                    key: "order.order_concrete.time_preference3",
                    format: formatTime
                },
                {
                    title: "Time Urgency",
                    key: "order.order_concrete.urgency"
                },
                {
                    title: "Message Required",
                    key: "order.order_concrete.message_required",
                    format: boolToAffirmative
                },
                {
                    title: "On Site / On Call",
                    key: "order.order_concrete.preference"
                }
            ]
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.navigation.state.params.orderDetail) {
            return {
                orderDetail: nextProps.navigation.getParam("orderDetail")
            }
        }
        return prevState;
    }

    render() {
        let orderDetail = this.props.navigation.getParam("orderDetail");
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Order Details"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_5, appStyles.bottomMarginDefault]}>
                        <TableRow rowData={orderDetail} rowColumns={this.state.rowColumns}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
