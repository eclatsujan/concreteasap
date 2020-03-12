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
import {order} from "../../../store/modules/order";

import * as Immutable from 'immutable';


export default class PendingBidDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: {}, //data from navigation state
            rowColumns: [
                {title:"Job No.",key:"order.job_id"},
                {
                    title: "Delivery Date and Time",
                    key: "date_delivery",
                    format: formatDate,
                    secondValue:"time_delivery",
                    secondValueFormat:formatTime,
                    seperator:","
                },
                // {title: "Job Delivery Time", key: "time_delivery", format: formatTime},
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
                    key: "order.order_concrete.delivery_date",
                    title: "Preference 1",
                    format: formatDate,
                    secondValue: "order.order_concrete.time_preference1",
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {
                    key: "order.order_concrete.delivery_date1",
                    secondValue: "order.order_concrete.time_preference2",
                    title: "Preference 2",
                    format: formatDate,
                    secondValueFormat: formatTime,
                    seperator:", "
                },
                {
                    key: "order.order_concrete.delivery_date2",
                    secondValue: "order.order_concrete.time_preference3",
                    title: "Preference 3",
                    format: formatDate,
                    secondValueFormat: formatTime,
                    seperator:", "
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
        let total=orderDetail?.get("order")?.get("order_concrete")?.get("quantity")*orderDetail?.get("price");
        orderDetail=orderDetail.setIn(["total"],total);
        // console.log(orderDetail.get("total"));
        // console.log(orderDetail instanceof Immutable.Map);
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
