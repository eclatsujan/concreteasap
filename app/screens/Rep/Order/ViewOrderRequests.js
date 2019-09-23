import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

import {styles} from '../styles.js';

import {connect} from "react-redux";
import { actions, States } from '../../../store';


class RepViewOrderRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Suburb', 'Cubic m', 'Actions']
        }
    }

    componentWillMount(){
        this.props.getAllOrder();
    }

    _alertIndex(rowData) {
        this.props.navigation.navigate("Order Details",{orderDetail:rowData});
    }

    displayTableHeader(){
        return (
            <Row>
                <Grid style={{marginTop:20, borderBottomWidth: 2,borderBottomColor: 'grey',}}>
                    {this.state.tableHead.map((rowData, index) => (
                        <Col key={index} style={{marginLeft:10,}}>
                            <Text>{rowData}</Text>
                        </Col>
                    ))}
                </Grid>
            </Row>
        );
    }

    displayTableData(){
        return this.props.order.orders.map((rowData, index) => (
            <Row key={index}>
                <Grid style={{marginTop:10}}>
                    <Col style={styles.tableBorder}>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col style={styles.tableBorder}>
                        <Text>{rowData.order_concrete!=null?rowData.order_concrete.suburb:""}</Text>
                    </Col>
                    <Col style={styles.tableBorder}>
                        <Text>{rowData.order_concrete!=null?rowData.order_concrete.quantity:""}</Text>
                    </Col>
                    <Col style={styles.tableBorder}>
                        <Button
                            style={{width:"95%"}}
                            onPress={() => this._alertIndex(rowData)}>
                            <Text style={{textAlign:'center'}}>View Details</Text>
                        </Button>
                    </Col>
                </Grid>
            </Row>
        ));
    }

    render(){
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        >
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
                        <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>View Orders Requests</Text>
                        {this.displayTableHeader()}
                        {this.displayTableData()}
                        <View style={styles.registerButton}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                <Text style = {styles.buttonText}>Back To Home</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrder: () => {
            return dispatch(actions.order.getAllOrder())
        }
    }
}

const mapStateToProps = (state) => {
    const {order}=state;
    return {order};
}


export default connect(mapStateToProps,mapDispatchToProps)(RepViewOrderRequests);
