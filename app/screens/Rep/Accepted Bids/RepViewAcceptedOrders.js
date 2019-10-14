import * as React from 'react';
import {TextInput, StyleSheet, Label, TouchableOpacity, ScrollView, ImageBackground, Dimensions} from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';

import {connect} from "react-redux";
import { actions, States } from '../../../store';
import {appStyles} from "../../assets/app_styles";
import AppHeader from "../../../components/AppHeader";

class RepViewAcceptedOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order #', 'Date', 'Status', 'Actions'],
            tableData: [
                {
                    "id":200,
                    "Date":"2019-03-12",
                    "Status":"completed",
                },
                {
                    "id":202,
                    "Date":"2019-03-12",
                    "Status":"completed",
                },
                {
                    "id":203,
                    "Date":"2019-03-12",
                    "Status":"completed",
                },
                {
                    "id":204,
                    "Date":"2019-03-12",
                    "Status":"completed",
                }
            ],
        }
    }

    componentWillMount(){
        this.props.getAllOrder();
    }

    _alertIndex(id) {
        // console.log("bids:", id);
        this.props.navigation.navigate("OrderStatus",{id:id});
    }

    displayTableData(){
        console.log(this.props.order);
        return this.state.tableData.map((rowData, index) => (
            <Grid key={index}>
                <Row style={[appStyles.paddingYDefault]}>
                    <Col style={appStyles.flex1}>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col style={appStyles.flex3}>
                        <Text>{rowData.Status}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={appStyles.btnGray} onPress={() => this._alertIndex(rowData.id)}>
                            <Text style={[appStyles.txtCenter,appStyles.btnInverseColor]}>View Details</Text>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        ));
    }

    render(){
        let { height, width } = Dimensions.get('window');
        return (
            <ImageBackground source={require("../../../../assets/concrete-background.png")} style={{width:"100%",height:"100%"}}>
                <Container style={[appStyles.bgTransparent]}>
                    <AppHeader/>
                    <Content contentContainerStyle={styles.content}>
                        <ScrollView>
                            <View>
                                <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold'}}>Past Accepted Orders</Text>
                            </View>
                            <View style={[appStyles.bgWhite,appStyles.marginAppDefault,appStyles.paddingAppDefault]}>
                                <Grid>
                                    <Col style={appStyles.flex1}>
                                        <Text>ORDER NO.</Text>
                                    </Col>
                                    <Col style={appStyles.flex3}>
                                        <Text>STATUS</Text>
                                    </Col>
                                </Grid>
                                {this.displayTableData()}
                            </View>
                        </ScrollView>
                        <View style={styles.registerButton}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                <Text style = {styles.buttonText}>Back To Home</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrder: () => {
            return dispatch(actions.order.getAllOrder())
        }
    }
};

const mapStateToProps = (state) => {
    const {order}=state;
    return {order};
};


export default connect(mapStateToProps,mapDispatchToProps)(RepViewAcceptedOrders);

