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

import AppFooter from "../../../components/Footer/AppFooter";


export default class OrderPendingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: props.navigation.state.params.orderDetail, //data from navigation state
            rowColumns: [
                {
                    title: "Suburb/Post-Code",
                    key: "suburb"
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
                    title: "Additives",
                    key: "acc"
                },
                {
                    title: "Placement Type",
                    key: "placement_type"
                },
                {
                    title: "delivery_date",
                    key: "delivery_date"
                },
                {
                    title: "Time Preferences 1",
                    key: "time_preferences1"
                },
                {
                    title: "Time Preferences 2",
                    key: "time_preferences2"
                },
                {
                    title: "Time Preferences 3",
                    key: "time_preferences3"
                },
                {
                    title: "Time Deliveries",
                    key: "urgency"
                },
                {
                    title: "Message Required",
                    key: "message_required"
                },
                {
                    title: "On Site/Call",
                    key: "preference"
                },
                {
                    title: "Colours",
                    key: "colours"
                }
            ]
        };
    }

    render() {
        let orderDetail = this.props.navigation.state.params.orderDetail;

        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Order Details"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_5]}>
                        <TableRow rowData={orderDetail["order_concrete"]} rowColumns={this.state.rowColumns}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
