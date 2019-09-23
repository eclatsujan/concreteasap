import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';

import { connect } from 'react-redux';
import { actions, States } from '../../../store';

class ViewOrderRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', 'Actions'],
        }
    }

    componentWillMount(){
        this.props.getAllOrder();
    }

    _alertIndex(id) {
        // console.log("bids:", id);
        this.props.navigation.navigate("ViewBids",{itemId:id});
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
        // console.log(this.props.order);
        return this.props.order.orders.map((rowData, index) => (
            <Row key={index}>
                <Grid style={{marginTop:10}}>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2',marginLeft:10}}>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2',}}>
                        <Text>{rowData.status}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2', paddingBottom:10}}>
                        <Button
                            disabled={rowData.status=="close"? true: false}
                            onPress={() => this._alertIndex(rowData.id)}>
                            <Text>View</Text>
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
                        <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>View Order Requests</Text>
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
        getAllOrder: (collection) => {
            // console.log(actions);
            return dispatch(actions.order.getAllOrder())
        },
    }
}

const mapStateToProps = (state) => {
    const {order}=state;
    return {order};
}


export default connect(mapStateToProps,mapDispatchToProps)(ViewOrderRequests);