import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content, View, Row, Col, Text} from 'native-base';
import AppBackground from "../../../../components/App/AppBackground";
import AppHeader from "../../../../components/Headers/AppHeader";
import SubHeader from "../../../../components/Headers/SubHeader";
import {appStyles} from "../../../../../assets/styles/app_styles";
import TableRow from "../../../../components/Basic/Tables/TableRow";
import {formatDate, formatTime} from "../../../../helpers/time";
import {boolToAffirmative} from "../../../../helpers/app";
import AppFooter from "../../../../components/App/Footer/AppFooter";


export default class AcceptedOrderFullDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {title: "Bid Date", key: "bids[0].date_delivery", format: formatDate},
                {title: "Bid Time", key: "bids[0].time_delivery", format: formatTime},
                {title: "Address", key: "order_concrete.address"}, {title: "Post Code", key: "order_concrete.post_code"},
                {title:"Suburb",key:"order_concrete.suburb"},{title: "State", key: "order_concrete.state"},
                {title: "Quantity", key: "order_concrete.quantity"}, {title: "Type", key: "order_concrete.type"},
                {title: "MPA", key: "order_concrete.mpa"}, {title: "Slump", key: "order_concrete.slump"},
                {title: "ACC", key: "order_concrete.acc"},
                {title: "Placement Type", key: "order_concrete.placement_type"},
                {key: "order_concrete.delivery_date", title: "Date Preference 1", format: formatDate},
                {key: "order_concrete.delivery_date1", title: "Date Preference 2", format: formatDate},
                {key: "order_concrete.delivery_date2", title: "Date Preference 3", format: formatDate},
                {key: "order_concrete.time_preference1", title: "Time Preference 1", format: formatTime},
                {key: "order_concrete.time_preference2", title: "Time Preference 2", format: formatTime},
                {key: "order_concrete.time_preference3", title: "Time Preference 3", format: formatTime},
                {title: "Time Urgency", key: "order_concrete.urgency"},
                {title: "Message Required", key: "order_concrete.message_required", format: boolToAffirmative},
                {title: "On Site / On Call", key: "order_concrete.preference"}, {title: "Colour", key: "colours"},
                {title: "Special Instructions", key: "order_concrete.special_instructions"},
                {title: "Delivery Instructions", key: "order_concrete.delivery_instructions"}
            ]
        }
    }

    render() {
        /* 2. Read the params from the navigation state */
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader />
                    <SubHeader title="Active Order" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite, appStyles.bottomMarginDefault]}>
                        <View style={[appStyles.p_5]}>
                            <TableRow rowData={order} rowColumns={this.state.rowColumns}/>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}