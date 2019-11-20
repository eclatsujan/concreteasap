import * as React from 'react';
import {TextInput, ScrollView} from 'react-native';
import {View, Button, Text, Content, Row, Col, Item as FormItem} from 'native-base';

//Latest
import {PaymentsStripe as Stripe} from 'expo-payments-stripe';
import {paymentService} from '../../../services/paymentService'

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import CardPayment from '../../../components/CardPayment'

import {appStyles} from '../../../../assets/styles/app_styles.js';
import TableRow from "../../../components/Tables/TableRow";
import BidPayment from "../../../components/Rep/Payment/BidPayment";
import PaymentSuccess from "../../../components/Rep/Payment/PaymentSuccess";

export default class OrderBidDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderDetail: {}, //data from navigation state
            // bid:{},
            pricePer: '',
            meter: '',
            total_cost: '',
            bidPayment: false,
            modalVisible: false,
            SaveDetails: false,
            paymentSuccessModal: false,
            token: "",
            keyTitle: {},
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
        this.setPerPrice = this.setPerPrice.bind(this);
        this.submitBid = this.submitBid.bind(this);
        this.showDetailsModel = this.showDetailsModel.bind(this);
        this.payNow = this.payNow.bind(this);
        this.openPriceModal = this.openPriceModal.bind(this);
        this.closePriceModal = this.closePriceModal.bind(this);
        this.paymentSuccess=this.paymentSuccess.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        let orderDetail = this.props.navigation.state.params.orderDetail;
        this.setState({"orderDetail": orderDetail});
        // getting the data of meter from navigation and updating the state of the meter
        const meter = orderDetail ? orderDetail["order_concrete"]["quantity"] : 0;
        let m = meter.toString();
        this.setState({meter: m});
        Stripe["setOptionsAsync"]({
            publishableKey: 'pk_test_wF2PcumUqSC8irnWWTAa4w9u00CIYe7HNL', // Your key
        });
    }

    setPerPrice(price) {
        this.setState({pricePer: price});
        let pricePer = isNaN(parseInt(price)) ? 0 : price;
        let meter = parseInt(this.state.meter);
        let total = (pricePer * meter) + (pricePer * meter * 10) / 100;
        let Final = total.toString();
        this.setState({"total_cost": Final});
    }

    showDetailsModel(val) {
        this.setModalVisible(!this.state.modalVisible);
        this.setState({SaveDetails: val});
        this.payBid().then((res) => {
            // console.log(res);
            this.setState({"paymentSuccessModal": true})
            // this.props.navigation.setParams({success_msg: 'Lucy'})
        });
    }

    submitBid() {
        this.stripePayment().then((token) => {
            this.setState({token: token});
            this.setModalVisible(true);
        });
    }

    payNow() {
        this.setState({bidPayment: false});
        this.submitBid();
    }

    openPriceModal() {
        this.setState({bidPayment: true});
    }

    closePriceModal() {
        this.setState({bidPayment: false});
    }

    async stripePayment() {
        return await Stripe["paymentRequestWithCardFormAsync"]();
    }

    async payBid() {
        return await paymentService.payBidPrice(this.state.token, this.state.orderDetail["id"], this.state.pricePer, this.state.SaveDetails);
    }

    paymentSuccess() {
        this.setState({paymentSuccessModal:false});
        this.props.navigation.goBack();
    }

    renderNonEditableInput(label, value) {
        return <Row style={[appStyles.mt_10, appStyles.verticalCenter]}>
            <Col>
                <Text style={appStyles.upperCase}>{label}</Text>
            </Col>
            <Col>
                <TextInput
                    style={[appStyles.loginInput, appStyles.p_10, appStyles.border2, appStyles.borderBlack]}
                    value={value}
                    editable={false}/>
            </Col>
        </Row>
    }


    render() {
        let order = this.props.navigation.state.params.orderDetail;
        let title = "Order Details ID #" + order["order_concrete"]["id"];
        let order_concrete = order["order_concrete"];

        let btnStatus = !(this.state.total_cost || this.state.total_cost === "0");
        return (
            <AppBackground enableKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title={title}/>
                    <Content style={[appStyles.p_5]}>
                        <View style={[appStyles.bgWhite, appStyles.mb_10, appStyles.p_5]}>
                            <TableRow rowData={order_concrete} rowColumns={this.state.rowColumns}/>
                            <Row style={[appStyles.mt_10, appStyles.verticalCenter]}>
                                <Col>
                                    <Text style={[appStyles.upperCase]}>Price per m2</Text>
                                </Col>
                                <Col>
                                    <FormItem style={[appStyles.loginInput, appStyles.p_10, appStyles.border2]} regular>
                                        <TextInput keyboardType={'numeric'} placeholder="ENTER BID AMOUNT"
                                                   style={appStyles.baseFont}
                                                   value={this.state.pricePer} onChangeText={this.setPerPrice}/>
                                    </FormItem>
                                </Col>
                            </Row>
                            {this.renderNonEditableInput("Required m2", this.state.meter)}
                            {this.renderNonEditableInput("Total\n(Plus 10% Admin Fee)", this.state.total_cost)}
                        </View>

                        <Button disabled={btnStatus} style={appStyles.horizontalCenter} onPress={() => {
                            this.openPriceModal()
                        }}>
                            <Text style={appStyles.colorBlack}>Bid</Text>
                        </Button>
                        <BidPayment modalVisibility={this.state.bidPayment} handleModel={this.payNow}
                                    cancelModel={this.closePriceModal}/>
                        <CardPayment modalVisibility={this.state.modalVisible} handleModel={this.showDetailsModel}/>
                        <PaymentSuccess modalVisibility={this.state.paymentSuccessModal}
                                        handleModel={this.paymentSuccess} />
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
