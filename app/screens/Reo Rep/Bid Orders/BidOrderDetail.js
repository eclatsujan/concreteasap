import * as React from 'react';
import {TextInput, ScrollView, InteractionManager,} from 'react-native';
import {View, Icon, Text, Content, Row, Col, Item as FormItem, Picker} from 'native-base';

//Latest
import {PaymentsStripe as Stripe} from 'expo-payments-stripe';
// import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';

import {paymentService} from '../../../services/paymentService'

//Custom Components
import AppBackground from "../../../components/App/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import CardPayment from '../../../components/Rep/Payment/CardPayment'

import {appStyles} from '../../../../assets/styles/app_styles';
import TableRow from "../../../components/Basic/Tables/TableRow";
import BidPayment from "../../../components/Rep/Payment/BidPayment";
import PaymentSuccess from "../../../components/Rep/Payment/PaymentSuccess";

import {formatDate, formatTime} from '../../../helpers/time'
import {actions} from "../../../store/modules";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {boolToAffirmative, normalize} from "../../../helpers/app";
import AppFooter from "../../../components/App/Footer/AppFooter";
import CustomButton from "../../../components/Basic/Button/CustomButton";

class BidOrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orderDetail: {}, //data from navigation state
            // bid:{},
            pricePer: '',
            meter: '',
            total_cost: 0,
            bidPayment: false,
            showCard: false,
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
                    key: "post_code"
                },
                {
                    title: "Suburb",
                    key: "suburb"
                },
                {
                    title: "State",
                    key: "state"
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
        // Do expensive Stuff such as loading
        this.setState({
            loading: false,
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

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.state.token&&!this.state.bidPayment&&!this.state.modalVisible){
    //
    //     }
    // }

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

    }

    submitBid() {
        this.setState({bidPayment: false});
        setTimeout(() => {
            this.stripePayment().then((token) => {
                this.setState({loading: true});
                this.setState({token});
                // this.setState({modalVisible: true});
                this.payBid().then((res) => {
                    this.setState({"loading": false});
                    this.setState({"paymentSuccessModal": true});
                    setTimeout(() => {
                        this.setState({"paymentSuccessModal": false});
                        this.props.navigation.navigate("Home");
                    }, 2000);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }, 1000);

    }

    submitBidThroughScan() {
        this.scanCard().then((card) => {
            this.stripePaymentToken(card).then((token) => {
                this.setState({token: token});
                this.setModalVisible(true);
            });
        }).catch((err) => {

        });
    }

    payNow() {
        this.submitBid();
    }

    openPriceModal() {
        this.setState({bidPayment: true});
    }

    closePriceModal() {
        this.setState({bidPayment: false});
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
                    style={[appStyles.customInput, appStyles.p_10, appStyles.colorWhite, appStyles.bgGray]}
                    value={value}
                    editable={false}/>
            </Col>
        </Row>
    }


    render() {
        let order = this.props.navigation.state.params.orderDetail;
        let title = "Order Details ID #" + order?.get("job_id");
        let order_concrete = order?.get("order_concrete");
        let btnStatus = this.state.total_cost === 0 || this.state.datePreference === "";

        return (
            <AppBackground loading={this.state.loading} enableKeyBoard disableBack>
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
                                        Select Date and Time
                                    </Text>
                                </Col>
                                <Col>
                                    <View style={[appStyles.loginInput, appStyles.border2]}>
                                        <Picker selectedValue={this.state.datePreference}
                                                itemTextStyle={[appStyles.arialFont]}
                                                itemStyle={[appStyles.arialFont]}
                                                headerTitleStyle={appStyles.arialFont}
                                                headerBackButtonTextStyle={appStyles.arialFont}
                                                onValueChange={(itemValue) => {
                                                    this.setState({datePreference: itemValue});
                                                }}>

                                            <Picker.Item label={"Select One"} value={""}/>

                                            <Picker.Item
                                                label={formatDate(order_concrete?.get("delivery_date")) + ", " + formatTime(order_concrete?.get("time_preference1"))}
                                                value={"time1"}/>

                                            <Picker.Item
                                                label={formatDate(order_concrete?.get("delivery_date1")) + ", " + formatTime(order_concrete?.get("time_preference2"))}
                                                value={"time2"}/>

                                            <Picker.Item
                                                label={formatDate(order_concrete?.get("delivery_date2")) + ", " + formatTime(order_concrete?.get("time_preference3"))}
                                                value={"time3"}/>
                                        </Picker>
                                    </View>
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
                                    <FormItem style={[appStyles.customInput, appStyles.border2]}
                                              regular>
                                        <View style={[appStyles.bgBlack,appStyles.px_5,appStyles.h_100,appStyles.horizontalCenter]}>
                                            <Icon active name='dollar' type={"FontAwesome"}
                                                  style={[appStyles.colorWhite,{fontSize:normalize(10)}]}/>
                                        </View>
                                        <View style={appStyles.flex1}>
                                            <TextInput keyboardType={'numeric'} placeholder="ENTER BID AMOUNT"
                                                       style={[appStyles.baseFont, appStyles.px_5, appStyles.py_10, appStyles.mr_5]}
                                                       value={this.state.pricePer} onChangeText={this.setPerPrice}/>
                                        </View>
                                    </FormItem>
                                </Col>
                            </Row>
                            {this.renderNonEditableInput("Required m3", this.state.meter)}
                            {this.renderNonEditableInput("Total\n(Plus 10% Admin Fee)", this.state.total_cost.toString())}
                        </View>
                        <View style={[appStyles.flexRow, appStyles.flexWrap, appStyles.justifyBetween]}>
                            <View style={[appStyles.w_45]}>
                                <CustomButton btnIcon="arrow-left" btnText={"Back"} onPress={() => {
                                    this.props.navigation.goBack()
                                }}/>
                            </View>
                            <View style={[appStyles.w_45]}>
                                <CustomButton disabled={btnStatus} btnText={"Bid"} onPress={() => {
                                    this.openPriceModal()
                                }}/>
                            </View>
                        </View>

                        <CardPayment modalVisibility={this.state.modalVisible} handleModel={this.showDetailsModel}/>
                        <PaymentSuccess modalVisibility={this.state.paymentSuccessModal}
                                        handleModel={this.paymentSuccess}/>
                        <BidPayment modalVisibility={this.state.bidPayment} handleModel={this.payNow}
                                    cancelModel={this.closePriceModal}/>

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