import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button,Text,Content,Footer,FooterTab,Row,Col } from 'native-base';

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/AppHeader";
import SubHeader from "../../../components/SubHeader";

import {styles} from '../styles.js';
import {appStyles} from '../../assets/app_styles.js';


export default class OrderPendingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            orderDetail : props.navigation.state.params.orderDetail, //data from navigation state
            // bid:{},
            pricePer:'',
            meter: '',
            modalVisible: false,
            SaveDetails:false,
            token:""
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentWillMount(){

    }

    render(){
        return (
            <AppBackground>
                <AppHeader/>
                <SubHeader iconName="user" />>
                <Content style={[appStyles.bgWhite,appStyles.p_5]}>
                    <ScrollView>
                        <Row>
                            <Col>
                                <Text>Suburb / Post Code</Text>
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
                            <Col>
                                <Text>{this.state.orderDetail["order_concrete"]["suburb"]}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].type}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].mpa}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].agg}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].slump}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].acc}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].placement_type}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].quantity}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].time_preference1}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].delivery_date}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].urgency}</Text>
                                <Text>{this.state.orderDetail["order_concrete"].preference}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>Colors:</Text>
                            </Col>
                            <Col>
                                <Text>{this.state.orderDetail["order_concrete"].colours}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text style={{marginTop:20}}>Special Instructions:</Text>
                            </Col>
                            <Col>
                                <Text style={{marginTop:20}}>{this.state.orderDetail["order_concrete"]["special_instructions"]}</Text>
                            </Col>
                        </Row>
                        <Row style={appStyles.mt_10}>
                            <Col>
                                <Text style={{marginTop:20}}>Delivery Instructions:</Text>
                            </Col>
                            <Col>
                                <Text style={{marginTop:20}}>{this.state.orderDetail["order_concrete"]["delivery_instructions"]}</Text>
                            </Col>
                        </Row>
                    </ScrollView>
                </Content>
                <Footer style={{marginBottom:30}}>
                    <FooterTab>
                      <Button style={appStyles.button,appStyles.buttonPrimary} onPress={()=>this.props.navigation.navigate("Home")}>
                          <Text style = {appStyles.buttonBlack}>Back to Home</Text>
                      </Button>
                    </FooterTab>
                </Footer>
            </AppBackground>
        );
    }
}
