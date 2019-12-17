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


class OrderBidStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment_method: "COD",
            rowColumns: [
                {title: "BID Date", key: "bid.date_delivery", format: formatDate},
                {title: "BID Time", key: "bid.time_delivery", format: formatTime},
                {title: "Price M3", key: "bid.price"},
                {title: "Quantity", key: "order_concrete.quantity"},
                {title: "Total Price", key: "total"},
                {title: "Address", key: "order_concrete.address"},
                {title: "Post-Code", key: "order_concrete.suburb"},
                {title: "Type", key: "order_concrete.type"},
                {title: "MPA", key: "order_concrete.mpa"},
                {title: "Slump", key: "order_concrete.slump"},
                {title: "Additives", key: "order_concrete.acc"},
                {title: "Placement Type", key: "order_concrete.placement_type"},
                {title: "Time Deliveries", key: "order_concrete.urgency"},
                {title: "Message Required", key: "order_concrete.message_required", format: boolToAffirmative}
            ]
        };
        this.submitBid = this.submitBid.bind(this);
    }

    submitBid() {
        let bid_id = this.props.navigation.getParam("bid_id");
        this.props.acceptBid(bid_id, this.state.payment_method);
    }

    render() {
        /* 2. Read the params from the navigation state */
        const order = this.props.navigation.getParam("order");
        let bid_id = this.props.navigation.getParam("bid_id");
        let bid = order?.get("bids").find((bid) => bid.get("id") === bid_id);
        let full_order = order.set("bid", bid);
        full_order = full_order.set("total", parseFloat(bid.get("price")) * parseInt(order.get("order_concrete").get("quantity")));

        return (
            <AppBackground>
                <AppHeader/>
                <ScrollView>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="Order Bid Status"/>
                    <Content>
                        <View style={[appStyles.bgWhite, appStyles.p_10]}>
                            <TableRow rowData={full_order} rowColumns={this.state.rowColumns}/>
                            <Row>
                                <Col><Text style={appStyles.baseSmallFontSize}>Select Payment Method</Text></Col>
                            </Row>
                            <Row style={[appStyles.w_75, appStyles.p_5, appStyles.verticalCenter]}>
                                <Col>
                                    <Row>
                                        <Col style={[appStyles.w_35]}>
                                            <Radio
                                                color={"#f0ad4e"}
                                                selectedColor={"#5cb85c"}
                                                selected={this.state.payment_method === "COD"}
                                                onPress={() => {
                                                    this.setState({"payment_method": "COD"})
                                                }}
                                            />
                                        </Col>
                                        <Col style={appStyles.w_65}>
                                            <Text style={[appStyles.baseSmallFontSize, appStyles.pl_5]}>COD</Text>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col style={[appStyles.w_35]}>
                                            <Radio
                                                color={"#f0ad4e"}
                                                selectedColor={"#5cb85c"}
                                                selected={this.state.payment_method === "Account"}
                                                onPress={() => {
                                                    this.setState({"payment_method": "Account"})
                                                }}
                                            />
                                        </Col>
                                        <Col style={appStyles.w_65}>
                                            <Text style={[appStyles.baseSmallFontSize, appStyles.pl_5]}>Account</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </View>
                        <Button primary style={[appStyles.my_5, appStyles.horizontalCenter]} onPress={this.submitBid}>
                            <Text style={appStyles.colorBlack}>Confirm</Text>
                        </Button>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptBid: (bid_id, payment_method) => {
            // console.log(bid_id);
            return dispatch(actions.order.acceptBid(bid_id, payment_method))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.get("order")
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderBidStatus);