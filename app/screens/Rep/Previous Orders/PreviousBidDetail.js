import * as React from 'react';
import {connect} from "react-redux";
import {actions} from "../../../store/modules";
import AppBackground from "../../../components/App/AppBackground";
import {ScrollView} from "react-native";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import {Content} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import TableRow from "../../../components/Basic/Tables/TableRow";
import {boolToAffirmative} from "../../../helpers/app";
import {formatDate, formatTime} from "../../../helpers/time";

class PreviousBidDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            rowColumns: [
                {title:"Job No.",key:"order.job_id"},
                {title: "Job Delivery Date", key: "date_delivery", format: formatDate},
                {title: "Job Delivery Time", key: "time_delivery", format: formatTime},
                {title: "Price Per M3", key: "price"},
                {title: "Required M3", key: "order.order_concrete.quantity"},
                {title: "Address", key: "order.order_concrete.address"},
                {title: "Post Code", key: "order.order_concrete.post_code"},
                {title: "Suburb", key: "order.order_concrete.suburb"},
                {title: "State", key: "order.order_concrete.state"},
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
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepPreviousBids();
            this.interval = setInterval(this.props.getRepPreviousBids, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });
    }

    componentDidMount() {
        this.props.getRepPreviousBids();
        this.setState({isLoading:false});
    }

    getPreviousOrder(bid_id){
        return this.props.bid.get("previous_bids").get("data").find((bid)=>{
            return bid.get("id")===bid_id;
        });
    }

    render(){
        let bid_id=this.props.navigation.getParam("bid_id");
        let bid=this.getPreviousOrder(bid_id);
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

const mapDispatchToProps = (dispatch) => {
    return {
        getRepPreviousBids: () => {
            return dispatch(actions.bid.getRepPreviousBids())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        bid: state.get("bid")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PreviousBidDetail);