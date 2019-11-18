import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Row, Col, Radio, Right, Left} from 'native-base';

import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'
import TableRow from "../../../components/Tables/TableRow";
import {connect} from "react-redux";
import {actions} from "../../../store/modules";


class OrderBidStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment_method: "COD",
            rowColumns: [
                {title: "Suburb/Post-Code", key: "suburb"},
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
                    key: "time_preference1"
                },
                {
                    title: "Time Preferences 2",
                    key: "time_preference2"
                },
                {
                    title: "Time Preferences 3",
                    key: "time_preference3"
                },
                {
                    title: "Time Deliveries",
                    key: "urgency"
                },
                {
                    title: "Message Required",
                    key: "message_required"
                }
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
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;
        return (
            <AppBackground>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="Order Bid Status"/>
                <Content>
                    <ScrollView>
                        <View style={appStyles.bgWhite}>
                            <TableRow rowData={order["order_concrete"]} rowColumns={this.state.rowColumns}/>
                            <Row>
                                <Col><Text> Select Payment Method</Text></Col>
                            </Row>
                            <Row style={[appStyles.w_75, appStyles.p_5]}>
                                <Col>
                                    <Row>
                                        <Col style={appStyles.w_25}>
                                            <Radio
                                                color={"#f0ad4e"}
                                                selectedColor={"#5cb85c"}
                                                selected={this.state.payment_method === "COD"}
                                                onPress={() => {
                                                    this.setState({"payment_method": "COD"})
                                                }}
                                            />
                                        </Col>
                                        <Col style={appStyles.w_75}>
                                            <Text>COD</Text>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col style={appStyles.w_25}>
                                            <Radio
                                                color={"#f0ad4e"}
                                                selectedColor={"#5cb85c"}
                                                selected={this.state.payment_method === "Account"}
                                                onPress={() => {
                                                    this.setState({"payment_method": "Account"})
                                                }}
                                            />
                                        </Col>
                                        <Col style={appStyles.w_75}>
                                            <Text>Account</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </View>
                        <Button primary style={[appStyles.my_5, appStyles.horizontalCenter]} onPress={this.submitBid}>
                            <Text style={appStyles.colorBlack}>Confirm</Text>
                        </Button>
                    </ScrollView>
                </Content>
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


export default connect(null, mapDispatchToProps)(OrderBidStatus);