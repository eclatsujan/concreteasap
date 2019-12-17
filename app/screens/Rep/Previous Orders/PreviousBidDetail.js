import * as React from 'react';
import {connect} from "react-redux";
import {actions} from "../../../store/modules";
import AppBackground from "../../../components/AppBackground";
import {ScrollView} from "react-native";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import {Content} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import TableRow from "../../../components/Tables/TableRow";
import {boolToAffirmative} from "../../../helpers/app";
import {formatDate, formatTime} from "../../../helpers/time";

export default class PreviousBidDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            rowColumns: [
                {title: "Order Delivery Date", key: "date_delivery", format: formatDate},
                {title: "Order Delivery Time", key: "time_delivery", format: formatTime},
                {title: "Price Per M2", key: "price"},
                {title: "Required M2", key: "order.order_concrete.quantity"},
                {title: "Address", key: "order.order_concrete.address"},
                {title: "Post Code", key: "order.order_concrete.suburb"},
                {title: "Type", key: "order.order_concrete.type"}, {title: "MPA", key: "order.order_concrete.mpa"},
                {title: "Agg", key: "order.order_concrete.agg"}, {title: "slump", key: "order.order_concrete.slump"},
                {title: "ACC", key: "order.order_concrete.acc"},
                {title: "Placement Type", key: "order.order_concrete.placement_type"},
                {title: "Time Between Deliveries", key: "order.order_concrete.time_deliveries"},
                {title: "On Site/On Call", key: "order.order_concrete.preference"},
                {title: "Message Required", key: "order.order_concrete.message_required", format: boolToAffirmative},
                {title: "Delivery Instructions", key: "order.order_concrete.delivery_instructions"},
                {title: "Special Instructions", key: "order.order_concrete.special_instructions"},
                {title: "Colours", key: "order.order_concrete.colours"},
            ]
        }
    }

    componentDidMount() {
        this.setState({isLoading:false});
    }

    render(){
        let bid=this.props.navigation.getParam("bid");
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="search" title="Bid Detail"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_5, appStyles.bottomMarginDefault]}>
                        <TableRow rowData={bid} rowColumns={this.state.rowColumns}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }


}