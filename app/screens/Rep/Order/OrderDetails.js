import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Grid,Col } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';



export default class OrderDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            order : props.navigation.state.params.orderDetail, //data from navigation state
            pricePer:'',
            meter: '',
            totalcost:'',
        };

        this.setPerPrice=this.setPerPrice.bind(this);

    }

    componentWillMount(){
        this.setState({meter:this.state.order.order_concrete.quantity.toString()});
        // console.log();
    }

    setPerPrice(price){
        //console.log("setperprice",this.state.meter);
        this.setState({pricePer:price});
        let pricePer=parseInt(price);
        let meter=parseInt(this.state.meter);
        let total= (pricePer*meter)+(pricePer*meter*10)/100;
        let Final=total.toString();
        this.setState({totalcost : Final});
    }

    submitBid(){

    }


    render(){
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Concrete ASAP</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='person' />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <ScrollView>
                        <Text style={styles.mainTitle}>Order Details</Text>
                        <Grid>
                            <Col style={styles.defaultMarginLT}>
                                <Text>Suburb / Post Code</Text>
                                <Text>Type</Text>
                                <Text>MPA</Text>
                                <Text>AGG</Text>
                                <Text>Slump</Text>
                                <Text>Addatives</Text>
                                <Text>Placement Type</Text>
                                <Text>Quantity</Text>
                                <Text>Time</Text>
                                <Text>Date</Text>
                                <Text>Urgency</Text>
                                <Text>On Site / Call</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <Text>{this.state.order.order_concrete.suburb}</Text>
                                <Text>{this.state.order.order_concrete.type}</Text>
                                <Text>{this.state.order.order_concrete.mpa}</Text>
                                <Text>{this.state.order.order_concrete.agg}</Text>
                                <Text>{this.state.order.order_concrete.slump}</Text>
                                <Text>{this.state.order.order_concrete.acc}</Text>
                                <Text>{this.state.order.order_concrete.placement_type}</Text>
                                <Text>{this.state.order.order_concrete.quantity}</Text>
                                <Text>{this.state.order.order_concrete.time_preference1}</Text>
                                <Text>{this.state.order.order_concrete.delivery_date}</Text>
                                <Text>{this.state.order.order_concrete.urgency}</Text>
                                <Text>{this.state.order.order_concrete.preference}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.defaultMarginLT}>
                                <Text style={styles.marginL20}>Colors:</Text>
                            </Col>
                            <Col style={styles.marginL15}>
                                <Text style={styles.marginL20}>{this.state.order.order_concrete.colours}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.defaultMarginLT}>
                                <Text style={{marginTop:20}}>Special Instructions:</Text>
                            </Col>
                            <Col style={styles.marginL15}>
                                <Text style={styles.marginL20}>{this.state.order.order_concrete.special_instructions}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.defaultMarginLT}>
                                <Text style={styles.marginL20}>Delivery Instructions:</Text>
                            </Col>
                            <Col style={styles.marginL15}>
                                <Text style={styles.marginL20}>{this.state.order.order_concrete.delivery_instructions}</Text>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.defaultMarginLT}>
                                <Text style={styles.marginL20}>Price per m2:</Text>
                            </Col>
                            <Col style={styles.marginL15}>
                                <TextInput
                                    style={styles.displayCustomText}
                                    onChangeText={this.setPerPrice}
                                    value={this.state.pricePer} />
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.defaultMarginLT}>
                                <Text style={{marginTop:20}}>Required m2:</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <TextInput
                                    style={styles.displayCustomText}
                                    value={this.state.meter}
                                    editable={false} />
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.defaultMarginLT}>
                                <Text style={{marginTop:20}}>Total (Plus 10% Admin Fee):</Text>
                            </Col>
                            <Col style={{marginTop:15}}>
                                <TextInput
                                    style={styles.displayCustomText}
                                    value={this.state.totalcost}
                                    editable={false}/>
                            </Col>
                        </Grid>
                        <Grid style={{marginBottom:30, marginTop:30}}>
                            <Col style={styles.defaultMarginLT}>
                                <Text>Status : Pending</Text>
                            </Col>
                            <Col>
                                <View>
                                    <TouchableOpacity onPress={this.submitBid}>
                                        <Text style = {styles.primaryButton}>Bid</Text>
                                    </TouchableOpacity>
                                </View>
                            </Col>
                        </Grid>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}