import * as React from 'react';
import { TextInput, StyleSheet, Label, TouchableOpacity, ScrollView } from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';




export default class ViewBids extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            params: props.navigation.state.params,
            tableHead: ['Bids','$', 'Company', 'Actions'],
            tableData: [],
        }
    }

    componentWillMount() {
        console.log("Checking the view Bids id",this.state.params);
        let bids = this.state.params.bids;
        this.setState({tableData:bids});
        // this.props.getSingleOrder(orderId);
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
        return this.state.tableData.map((rowData, index) => (
            <Row key={index}>
                <Grid style={{marginTop:10}}>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2',marginLeft:10}}>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2',}}>
                        <Text>{rowData.price}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2',}}>
                        <Text>{rowData.user_id}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2', paddingBottom:10}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("OrderBidStatus")} >
                            <Text style = {{backgroundColor: "#3383de", borderRadius: 10,width: 80,height: 20, textAlign:"center"}}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10}}>
                            <Text style = {{backgroundColor: "#FE434C", justifyContent: "center", borderRadius: 10,width: 80,height: 20, textAlign:"center"}}>Reject</Text>
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </Row>
        ));
    }

    render(){

// /* 2. Read the params from the navigation state */
//     const { params } = this.props.navigation.state;
//     const bidsId = params ? params.bidsId : null;
//     // const otherParam = params ? params.otherParam : null;
//
//     console.log(JSON.stringify(bidsId)); //getting the selected item

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
                        <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>View Bids</Text>
                        {this.displayTableHeader()}
                        {this.displayTableData()}
                        <View style={styles.registerButton}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                <Text style = {styles.buttonText}>Back To Home</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

