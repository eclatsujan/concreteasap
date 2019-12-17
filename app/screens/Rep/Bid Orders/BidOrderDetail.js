import * as React from 'react';
import {TextInput, ScrollView,InteractionManager,} from 'react-native';
import {View, Button, Text, Content, Row, Col, Item as FormItem, Picker} from 'native-base';

//Latest
import {PaymentsStripe as Stripe} from 'expo-payments-stripe';
// import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';

import {paymentService} from '../../../services/paymentService'

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import CardPayment from '../../../components/CardPayment'

import {appStyles} from '../../../../assets/styles/app_styles';
import TableRow from "../../../components/Tables/TableRow";
import BidPayment from "../../../components/Rep/Payment/BidPayment";
import PaymentSuccess from "../../../components/Rep/Payment/PaymentSuccess";

import {formatDate, formatTime} from '../../../helpers/time'
import {actions} from "../../../store/modules";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {boolToAffirmative} from "../../../helpers/app";

class BidOrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            orderDetail: {}, //data from navigation state
            // bid:{},
            pricePer: '',
            meter: '',
            total_cost: 0,
            bidPayment: false,
            modalVisible: false,
            SaveDetails: false,
            paymentSuccessModal: false,
            token: "",
            keyTitle: {},
            datePreference: "",
            timePreference: "",
            rowColumns: [
                {
                    title: "Post Code",
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
                    title: "Time Deliveries",
                    key: "urgency"
                },
                {
                    title: "Message Required",
                    key: "message_required",
                    format: boolToAffirmative
                },
                {
                    title: "Colour",
                    key: "colours"

                },
                {
                    title: "Special Instructions",
                    key: "special_instructions"
                },
                {
                    title: "Delivery Instructions",
                    key: "delivery_instructions"
                }
            ]
        };
        this.setPerPrice = this.setPerPrice.bind(this);
        this.submitBid = this.submitBid.bind(this);
        this.showDetailsModel = this.showDetailsModel.bind(this);
        this.payNow = this.payNow.bind(this);
        this.openPriceModal = this.openPriceModal.bind(this);
        this.closePriceModal = this.closePriceModal.bind(this);
        this.paymentSuccess = this.paymentSuccess.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        let orderDetail = this.props.navigation.state.params.orderDetail;
        InteractionManager.runAfterInteractions(() => {
            // Do expensive Stuff such as loading
            this.setState({
                loading: false,
            });
        });
        this.setState({"orderDetail": orderDetail});
        // getting the data of meter from navigation and updating the state of the meter
        const meter = orderDetail ? orderDetail?.get("order_concrete")?.get("quantity") : 0;
        let m = meter?.toString();
        this.setState({meter: m});
        Stripe["setOptionsAsync"]({
            publishableKey: 'pk_test_wF2PcumUqSC8irnWWTAa4w9u00CIYe7HNL', // Your key
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    setPerPrice(price) {
        this.setState({pricePer: price});
        let pricePer = isNaN(parseInt(price)) ? 0 : price;
        let meter = parseInt(this.state.meter);
        let total = (pricePer * meter) + (pricePer * meter * 10) / 100;
        // let Final = total;
        this.setState({"total_cost": total});
    }

    showDetailsModel(val) {
        this.setModalVisible(!this.state.modalVisible);
        this.setState({SaveDetails: val});
        this.payBid().then((res) => {
            this.setState({"paymentSuccessModal": true})
        }).catch((err)=>{
            console.log(err);
        });
    }

    submitBid() {
        this.stripePayment().then((token) => {
            this.setState({token: token});
            this.setModalVisible(true);
        }).catch((err) => {
            console.log(err);
        });

    }

    submitBidThroughScan() {
        this.scanCard().then((card) => {
            this.stripePaymentToken(card).then((token) => {
                this.setState({token: token});
                this.setModalVisible(true);
            });
        }).catch(() => {

        });
    }

    payNow() {
        this.closePriceModal();
    }

    openPriceModal() {
        this.setState({bidPayment: true});
    }

    closePriceModal() {
        this.setState({bidPayment: false},()=>{
            // console.log("ok");
            this.submitBid();
        });
    }

    scanCard() {
        // return CardIOModule.scanCard({
        //     useCardIOLogo: false,
        //     hideCardIOLogo: true,
        // });
    }

    async stripePaymentToken(card) {
        return await Stripe["createTokenWithCardAsync"]({
            number: card["cardNumber"],
            expMonth: card["expiryMonth"],
            expYear: card["expiryYear"],
            cvc: card["cvv"]
        });
    }

    async stripePayment() {
        return await Stripe["paymentRequestWithCardFormAsync"]();
    }

    async payBid() {
        return await paymentService.payBidPrice(this.state.token, this.state.orderDetail.get("id"),
            this.state.pricePer, this.state.SaveDetails, this.state.datePreference, this.state.timePreference);
    }

    paymentSuccess() {
        let order = this.props.navigation.state.params.orderDetail;
        this.setState({paymentSuccessModal: false});
        this.props.placeBid(order.get("id"));
        this.props.navigation.goBack();
    }

    renderNonEditableInput(label, value) {
        return <Row style={[appStyles.mt_10, appStyles.verticalCenter]}>
            <Col>
                <Text style={[appStyles.upperCase, appStyles.boldFont, appStyles.baseSmallFontSize]}>
                    {label}
                </Text>
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
        let title = "Order Details ID #" + order?.get("order_concrete")?.get("id");
        let order_concrete = order?.get("order_concrete");
        let btnStatus = this.state.total_cost === 0 || this.state.datePreference === "" || this.state.timePreference === "";
        return (
            <AppBackground loading={this.state.loading} enableKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title={title}/>
                    <Content style={[appStyles.p_5, appStyles.bgWhite]}>
                        <View style={appStyles.mb_10}>
                            <TableRow rowData={order_concrete} rowColumns={this.state.rowColumns}/>
                        </View>
                        <View style={appStyles.p_5}>
                            <Row style={[appStyles.mt_5, appStyles.verticalCenter]}>
                                <Col>
                                    <Text
                                        style={[appStyles.upperCase, appStyles.boldFont, appStyles.baseSmallFontSize]}>
                                        Select Date
                                    </Text>
                                </Col>
                                <Col>
                                    <FormItem style={[appStyles.loginInput, appStyles.border2]} regular>
                                        <Picker selectedValue={this.state.datePreference}
                                                itemTextStyle={appStyles.arialFont}
                                                headerTitleStyle={appStyles.arialFont}
                                                headerBackButtonTextStyle={appStyles.arialFont}
                                                onValueChange={(itemValue) => {
                                                    this.setState({datePreference: itemValue});
                                                }}>
                                            <Picker.Item label={"Select One"} value={""}/>

                                            <Picker.Item label={formatDate(order_concrete?.get("delivery_date"))}
                                                         value={order_concrete?.get("delivery_date")}/>

                                            <Picker.Item label={formatDate(order_concrete?.get("delivery_date1"))}
                                                         value={order_concrete?.get("delivery_date1")}/>

                                            <Picker.Item label={formatDate(order_concrete?.get("delivery_date2"))}
                                                         value={order_concrete?.get("delivery_date2")}/>
                                        </Picker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={[appStyles.mt_5, appStyles.verticalCenter]}>
                                <Col>
                                    <Text
                                        style={[appStyles.upperCase, appStyles.boldFont, appStyles.baseSmallFontSize]}>
                                        Select Time
                                    </Text>
                                </Col>
                                <Col>
                                    <FormItem style={[appStyles.loginInput, appStyles.border2]} regular>
                                        <Picker itemTextStyle={appStyles.arialFont}
                                                headerTitleStyle={appStyles.arialFont}
                                                headerBackButtonTextStyle={appStyles.arialFont}
                                                selectedValue={this.state.timePreference}
                                                onValueChange={(itemValue) => {
                                                    this.setState({timePreference: itemValue});
                                                }}>
                                            <Picker.Item label={"Select One"} value={""}/>
                                            <Picker.Item label={formatTime(order_concrete?.get("time_preference1"))}
                                                         value={order_concrete?.get("time_preference1")}/>
                                            <Picker.Item label={formatTime(order_concrete?.get("time_preference2"))}
                                                         value={order_concrete?.get("time_preference2")}/>
                                            <Picker.Item label={formatTime(order_concrete?.get("time_preference3"))}
                                                         value={order_concrete?.get("time_preference3")}/>
                                        </Picker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={[appStyles.mt_5, appStyles.verticalCenter]}>
                                <Col>
                                    <Text
                                        style={[appStyles.upperCase, appStyles.boldFont, appStyles.baseSmallFontSize]}>
                                        Price per m3
                                    </Text>
                                </Col>
                                <Col>
                                    <FormItem style={[appStyles.loginInput, appStyles.p_10, appStyles.border2]} regular>
                                        <TextInput keyboardType={'numeric'} placeholder="ENTER BID AMOUNT"
                                                   style={appStyles.baseFont}
                                                   value={this.state.pricePer} onChangeText={this.setPerPrice}/>
                                    </FormItem>
                                </Col>
                            </Row>
                            {this.renderNonEditableInput("Required m3", this.state.meter)}
                            {this.renderNonEditableInput("Total\n(Plus 10% Admin Fee)", this.state.total_cost.toString())}
                        </View>
                        <Button disabled={btnStatus} style={appStyles.horizontalCenter} onPress={() => {
                            this.openPriceModal();
                        }}>
                            <Text style={appStyles.colorBlack}>Bid</Text>
                        </Button>
                        <BidPayment modalVisibility={this.state.bidPayment} handleModel={this.payNow}
                                    cancelModel={this.closePriceModal}/>
                        <CardPayment modalVisibility={this.state.modalVisible} handleModel={this.showDetailsModel}/>
                        <PaymentSuccess modalVisibility={this.state.paymentSuccessModal}
                                        handleModel={this.paymentSuccess}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        placeBid: (order_id) => {
            return dispatch(actions.bid.placeBid(order_id))
        }
    }
};


export default withNavigation(connect(null, mapDispatchToProps)(BidOrderDetail));