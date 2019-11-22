import * as React from 'react';
import { TextInput, ScrollView, Modal } from 'react-native';
import { View,Container, Button, Text,Content,Grid,Col } from 'native-base';

//Latest
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import {paymentService} from '../../../services/paymentService'
import SubHeader from "../../../components/Headers/SubHeader";
import AppHeader from "../../../components/Headers/AppHeader";

import {styles} from '../styles.js';

export default class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            orderDetail : props.navigation.state.params.orderDetail, //data from navigation state
            // bid:{},
            pricePer:'',
            meter: '',
            total_cost:'',
            modalVisible: false,
            SaveDetails:false,
            token:""
        };
        this.setPerPrice=this.setPerPrice.bind(this);
        this.submitBid=this.submitBid.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount(){
        const meter = this.state.orderDetail ?this.state.orderDetail["order_concrete"].quantity : null;
        let m=meter.toString();
        this.setState({meter:m});
        Stripe["setOptionsAsync"]({
            publishableKey: 'pk_test_wF2PcumUqSC8irnWWTAa4w9u00CIYe7HNL', // Your key
        });
    }

    setPerPrice(price){
        this.setState({pricePer:price});
        let pricePer=parseInt(price);
        let meter=parseInt(this.state.meter);
        let total= (pricePer*meter)+(pricePer*meter*10)/100;
        let Final=total.toString();
        this.setState({total_cost : Final});
    }

    showDetailsModel(val){
        this.setModalVisible(!this.state.modalVisible);
        this.setState({SaveDetails:val});       
        this.payBid().then((res)=>{
            console.log(res);
        });
    }

    submitBid(){
       this.stripePayment().then((token)=>{
            this.setState({token:token});
            this.setModalVisible(true);           
       });
    }


    async stripePayment(){
       return await Stripe["paymentRequestWithCardFormAsync"]();
    }

    async payBid(){
        return await paymentService.payBidPrice(this.state.token,this.state.orderDetail.id,this.state.pricePer,this.state.SaveDetails);
    }


    render(){
        return (
            <Container>
                <AppHeader/>
                <SubHeader title="Order Details" iconName="user" />
                <Content contentContainerStyle={styles.content}>
                    <ScrollView>
                        <Grid>
                            <Col style={{marginLeft:15, marginTop:15}}>
                                <Text>Post Code</Text>
                                <Text>Type</Text>
                                <Text>MPA</Text>
                                <Text>AGG</Text>
                                <Text>Slump</Text>
                                <Text>Additives</Text>
                                <Text>Placement Type</Text>
                                <Text>Quantity</Text>
                                <Text>Time</Text>
                                <Text>Date</Text>
                                <Text>Urgency</Text>
                                <Text>On Site / Call</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <Text>{this.state.orderDetail.order_concrete.suburb}</Text>
                                <Text>{this.state.orderDetail.order_concrete.type}</Text>
                                <Text>{this.state.orderDetail.order_concrete.mpa}</Text>
                                <Text>{this.state.orderDetail.order_concrete.agg}</Text>
                                <Text>{this.state.orderDetail.order_concrete.slump}</Text>
                                <Text>{this.state.orderDetail.order_concrete.acc}</Text>
                                <Text>{this.state.orderDetail.order_concrete.placement_type}</Text>
                                <Text>{this.state.orderDetail.order_concrete.quantity}</Text>
                                <Text>{this.state.orderDetail.order_concrete.time_preference1}</Text>
                                <Text>{this.state.orderDetail.order_concrete.delivery_date}</Text>
                                <Text>{this.state.orderDetail.order_concrete.urgency}</Text>
                                <Text>{this.state.orderDetail.order_concrete.preference}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={{marginLeft:15, marginTop:15}}>
                                <Text style={{marginTop:20}}>Colors:</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <Text style={{marginTop:20}}>{this.state.orderDetail.order_concrete.colours}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={{marginLeft:15, marginTop:15}}>
                                <Text style={{marginTop:20}}>Special Instructions:</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <Text style={{marginTop:20}}>{this.state.orderDetail.order_concrete.special_instructions}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={{marginLeft:15, marginTop:15}}>
                                <Text style={{marginTop:20}}>Delivery Instructions:</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <Text style={{marginTop:20}}>{this.state.orderDetail.order_concrete.delivery_instructions}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={{marginLeft:15, marginTop:15}}>
                                <Text style={{marginTop:20}}>Price per m2:</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <TextInput
                                    style={{ width:"95%", height: 40, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={this.setPerPrice}
                                    value={this.state.pricePer} />
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={{marginLeft:15, marginTop:15}}>
                                <Text style={{marginTop:20}}>Required m2:</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <TextInput
                                    style={{ width:"95%", height: 40, borderColor: 'gray', borderWidth: 1 }}
                                    value={this.state.meter}
                                    editable={false} />
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={{marginLeft:15, marginTop:15}}>
                                <Text style={{marginTop:20}}>Total (Plus 10% Admin Fee):</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <TextInput
                                    style={{ width:"95%", height: 40, borderColor: 'gray', borderWidth: 1 }}
                                    value={this.state.totalcost}
                                    editable={false}/>
                            </Col>
                        </Grid>
                        <Grid style={{marginBottom:30, marginTop:30}}>
                            <Col style={{marginLeft:15, marginTop:30}}>
                                <Text>Status : Pending</Text>
                            </Col>
                            <Col>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                    }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        'backgroundColor':'rgba(000,000,000,0.6)'}}>
                                        <View style={{
                                            width: 250,
                                            height: 250,
                                            backgroundColor:"white",
                                            alignItems: 'center',
                                            borderWidth: 2,}}>
                                            <Text style={{textAlign:"center", marginTop:40}}>Do you wanna save the card details?</Text>

                                            <Button onPress={() => {this.showDetailsModel(true); }}>
                                                <Text>Yes</Text>
                                            </Button>
                                            <Button onPress={() => {this.showDetailsModel(false); }}>
                                                <Text>No</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </Modal>

                                <Button onPress={() => {this.submitBid()}}>
                                    <Text>Place a Bid</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}