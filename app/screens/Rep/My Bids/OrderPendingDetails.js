import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from 'native-base';

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";

import {styles} from '../styles.js';
import {appStyles} from '../../assets/app_styles.js';
import TableRow from "../../../components/Tables/TableRow";
import {tableFields} from '../../../config/tableField';
import AppFooter from "../../../components/Footer/AppFooter";


export default class OrderPendingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: props.navigation.state.params.orderDetail, //data from navigation state
            rowColumns: [
                {title: "Suburb/Post Code", key: "order.order_concrete.suburb"},
                {title: "Type", key: "order.order_concrete.type"}, {title: "MPA", key: "order.order_concrete.mpa"},
                {title: "Agg", key: "order.order_concrete.agg"}, {title: "slump", key: "order.order_concrete.slump"},
                {title: "ACC", key: "order.order_concrete.acc"},
                {title: "Placement Type", key: "order.order_concrete.placement_type"},
                {title: "Date", key: "order.order_concrete.delivery_date"},
                {title: "Delivery Time", key: "order.order_concrete.time_preference1"},
                {title: "Time Between Deliveries", key: "order.order_concrete.time_deliveries"},
                {title: "On Site/On Call", key: "order.order_concrete.preference"},
                {title: "Message Required", key: "order.order_concrete.message_required"}
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
                    <Content style={[appStyles.bgWhite, appStyles.p_5]}>
                        <TableRow rowData={orderDetail} rowColumns={this.state.rowColumns}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
