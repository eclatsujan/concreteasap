import * as React from 'react';
import {TextInput, ScrollView} from 'react-native';
import {View, Button, Text, Content, Row, Col, Item as FormItem} from 'native-base';

//Latest
import {PaymentsStripe as Stripe} from 'expo-payments-stripe';
import {paymentService} from '../../../services/paymentService'

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/AppHeader";
import SubHeader from "../../../components/SubHeader";
import CardPayment from '../../../components/CardPayment'

import {appStyles} from '../../assets/app_styles.js';
import {order} from "../../../store/modules/order";


export default class OrderDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderDetail: props.navigation.state.params.orderDetail, //data from navigation state
            // bid:{},
            pricePer: '',
            meter: '',
            totalcost: '',
            modalVisible: false,
            SaveDetails: false,
            token: "",
            keyTitle: {}
        };
        this.setPerPrice = this.setPerPrice.bind(this);
        this.submitBid = this.submitBid.bind(this);
        this.showDetailsModel = this.showDetailsModel.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentWillMount() {
        // getting the data of meter from navigation and updating the state of the meter
        const meter = this.state.orderDetail ? this.state.orderDetail.order_concrete.quantity : null;
        let m = meter.toString();
        this.setState({meter: m});
        Stripe.setOptionsAsync({
            publishableKey: 'pk_test_wF2PcumUqSC8irnWWTAa4w9u00CIYe7HNL', // Your key
        });
    }

    setPerPrice(price) {
        this.setState({pricePer: price});
        let pricePer = parseInt(price);
        let meter = parseInt(this.state.meter);
        let total = (pricePer * meter) + (pricePer * meter * 10) / 100;
        let Final = total.toString();
        this.setState({"totalcost": Final});
    }

    showDetailsModel(val) {
        this.setModalVisible(!this.state.modalVisible);
        this.setState({SaveDetails: val});
        this.payBid().then((res) => {
            console.log(res);
            this.props.navigation.setParams({success_msg: 'Lucy'})
            this.props.navigation.goBack();
        });
    }

    submitBid() {
        this.stripePayment().then((token) => {
            this.setState({token: token});
            this.setModalVisible(true);
        });
    }


    async stripePayment() {
        return await Stripe.paymentRequestWithCardFormAsync();
    }

    async payBid() {
        console.log(this.state.token);
        return await paymentService.payBidPrice(this.state.token, this.state.orderDetail.id, this.state.pricePer, this.state.SaveDetails);
    }

    getKeyTitle(key) {
        return this.state.keyTitle.hasOwnProperty(key) ? this.state.keyTitle[key] : key.replace(/_/g, " ");
    }

    renderOrderDetail(title, value) {
        return (
            <Row style={[appStyles.borderBottom, appStyles.pt_15, appStyles.pb_5]}>
                <Col style={appStyles.w_65}>
                    <Text style={appStyles.upperCase}>{title}</Text>
                </Col>
                <Col style={appStyles.w_35}>
                    <Text>{value}</Text>
                </Col>
            </Row>
        );
    }

    renderNonEditableInput(label, value) {
        return <Row style={[appStyles.mt_10, appStyles.verticalCenter]}>
            <Col>
                <Text style={appStyles.upperCase}>{label}</Text>
            </Col>
            <Col>
                <TextInput
                    style={[appStyles.loginInput, appStyles.p_10, appStyles.border2,appStyles.borderBlack]}
                    value={value}
                    editable={false}/>
            </Col>
        </Row>
    }


    render() {
        let title = "Order Details ID #" + this.state.orderDetail["order_concrete"].id;
        let order_concrete = this.state.orderDetail["order_concrete"];
        console.log(order_concrete);
        return (
            <AppBackground enableKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="clipboard" title={title}/>
                    <Content style={[appStyles.p_5]}>
                        <View style={[appStyles.bgWhite, appStyles.mb_10, appStyles.p_5]}>
                            {this.renderOrderDetail("Suburb / Post Code", order_concrete["suburb"])}
                            {this.renderOrderDetail("Type", order_concrete["type"])}
                            {this.renderOrderDetail("MPA", order_concrete["mpa"])}
                            {this.renderOrderDetail("Slump", order_concrete["slump"])}
                            {this.renderOrderDetail("Additives", order_concrete["acc"])}
                            {this.renderOrderDetail("Placement Type", order_concrete["placement_type"])}
                            {this.renderOrderDetail("Delivery Date", order_concrete["delivery_date"])}
                            {this.renderOrderDetail("Time Preferences 1", order_concrete["time_preference1"])}
                            {this.renderOrderDetail("Time Preferences 2", order_concrete["time_preference2"])}
                            {this.renderOrderDetail("Time Preferences 3", order_concrete["time_preference3"])}
                            {this.renderOrderDetail("Time Between Deliveries", order_concrete["time_deliveries"])}
                            {this.renderOrderDetail("Urgency", order_concrete["urgency"])}
                            {this.renderOrderDetail("Message Request", order_concrete["message_required"] ? "Yes" : "No")}
                            <Row style={[appStyles.mt_10, appStyles.verticalCenter]}>
                                <Col>
                                    <Text style={[appStyles.upperCase]}>Price per m2</Text>
                                </Col>
                                <Col>
                                    <FormItem style={[appStyles.loginInput, appStyles.p_10, appStyles.border2]} regular>
                                        <TextInput placeholder="ENTER BID AMOUNT" style={appStyles.baseFont}
                                                   value={this.state.pricePer} onChangeText={this.setPerPrice}/>
                                    </FormItem>
                                </Col>
                            </Row>
                            {this.renderNonEditableInput("Required m2", this.state.meter)}
                            {this.renderNonEditableInput("Total\n(Plus 10% Admin Fee)", this.state.totalcost)}
                        </View>

                        <Button style={appStyles.horizontalCenter} onPress={() => {
                            this.submitBid()
                        }}>
                            <Text style={appStyles.colorBlack}>Bid</Text>
                        </Button>
                        <CardPayment modalVisibility={this.state.modalVisible} handleModel={this.showDetailsModel}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}
