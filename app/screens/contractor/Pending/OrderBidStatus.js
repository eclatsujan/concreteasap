import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Row, Col, Radio} from 'native-base';

import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'
import TableRow from "../../../components/Tables/TableRow";
import {connect} from "react-redux";
import {actions} from "../../../store/modules";
import {boolToAffirmative} from "../../../helpers/app";
import {formatDate, formatTime} from "../../../helpers/time";

import RadioGroup from 'react-native-radio-buttons-group';

import {merge} from 'immutable';
import CustomButton from "../../../components/Button/CustomButton";
import navigationHelper from "../../../helpers/navigationHelper";

class OrderBidStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment_method: "Card Payment",
            data: [
                {
                    label: 'Card Payment',
                    value: "Card Payment",
                },
                {
                    label: 'Account',
                    value: 'Account',
                },
            ],
            rowColumns: [
                {title: "BID Date", key: "bid.date_delivery", format: formatDate},
                {title: "BID Time", key: "bid.time_delivery", format: formatTime},
                {title: "Price M3", key: "bid.price"},
                {title: "Quantity", key: "concrete.quantity"},
                {title: "Total Price", key: "total"},
                {title: "Address", key: "concrete.address"},
                {title: "Post-Code", key: "concrete.suburb"},
                {title: "Type", key: "concrete.type"},
                {title: "MPA", key: "concrete.mpa"},
                {title: "Slump", key: "concrete.slump"},
                {title: "Additives", key: "concrete.acc"},
                {title: "Placement Type", key: "concrete.placement_type"},
                {title: "Time Deliveries", key: "concrete.urgency"},
                {title: "Message Required", key: "concrete.message_required", format: boolToAffirmative}
            ]
        };
        this.submitBid = this.submitBid.bind(this);
        this.onPress=this.onPress.bind(this);
    }

    submitBid(bid_id,date_delivery) {
        // let bid_id = this.props.navigation.getParam("bid_id");
        this.props.acceptBid(bid_id, this.state.payment_method,date_delivery);
    }

    onPress(data){
        let selected=data.find((obj)=>{
            return obj.selected;
        });
        data?this.setState({payment_method:selected.value}):null;

    }

    render() {

        let pending_data=this.props.pending_orders?.get("data");
        let pending_orders=pending_data?.get("orders");
        /* 2. Read the params from the navigation state */
        let order = pending_orders?.get(this.props.navigation.getParam("order_id").toString());
        let bid=pending_data?.get("bids")?.get(this.props.navigation.getParam("bid_id").toString());
        let order_concrete=pending_data?.get("order_concrete")?.get(order?.get("order_concrete").toString());

        let total=(parseFloat(order_concrete?.get("quantity"))*parseFloat(bid?.get("price"))).toString();

        let newOrder=order?.mergeIn(["bid"],bid)?.mergeIn(["concrete"],order_concrete)
                    .set("total",total);
        // console.log(bid?.get("date_delivery"));
        return (
            <AppBackground disableBack>
                <AppHeader/>
                <ScrollView>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="Order Bid Status"/>
                    <Content>
                        <View style={[appStyles.bgWhite, appStyles.p_10]}>
                            <TableRow rowData={newOrder} rowColumns={this.state.rowColumns}/>
                            <Row>
                                <Col style={[appStyles.py_10]}>
                                    <Text style={appStyles.baseSmallFontSize}>Select Payment Method</Text>
                                </Col>
                            </Row>
                            <Row>
                                <RadioGroup radioButtons={this.state.data} onPress={this.onPress} flexDirection='row' />
                            </Row>
                        </View>
                        <View style={[appStyles.justifyBetween,appStyles.flexWrap,appStyles.flexRow]}>
                            <View style={appStyles.w_45}>
                                <CustomButton btnIcon="arrow-left" btnText={"Back"} onPress={()=>{
                                    navigationHelper.goBack();
                                }}/>
                            </View>
                            <View style={appStyles.w_45}>
                                <CustomButton btnText={"Confirm"} onPress={()=>{
                                    this.submitBid(bid?.get("id"),bid?.get('date_delivery'));
                                }} />
                            </View>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptBid: (bid_id, payment_method,date_delivery) => {
            return dispatch(actions.order.acceptBid(bid_id, payment_method,date_delivery))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        pending_orders:state.get("pending_order")
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderBidStatus);