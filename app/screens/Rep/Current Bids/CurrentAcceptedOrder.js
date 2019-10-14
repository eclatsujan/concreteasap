import * as React from 'react';
import {TextInput, StyleSheet, Label, TouchableOpacity, ScrollView, ImageBackground, Dimensions} from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';
import AppHeader from "../../../components/AppHeader";



export default class CurrentAcceptedOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            tableHead: ['Order #', 'Status', 'Actions'],
            tableData: [
                {
                    "id":200,
                    "Status":"pending"
                },
                {
                    "id":202,
                    "Status":"pending"
                },
                {
                    "id":203,
                    "Status":"pending"
                },
                {
                    "id":204,
                    "Status":"pending"
                }
            ],
        }
    }

    _alertIndex(id) {
        console.log("bids:", id);
        this.props.navigation.navigate("OrderStatus",{id:id});
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
                        <Text>{rowData.Status}</Text>
                    </Col>
                    <Col style={{borderBottomWidth: 2,borderBottomColor: '#f2f2f2', paddingBottom:10}}>
                        <Button
                            style={{width:"95%"}}
                            onPress={() => this._alertIndex(rowData.id)}>
                            <Text style={{textAlign:'center'}}>View Details</Text>
                        </Button>
                    </Col>
                </Grid>
            </Row>
        ));
    }

    render(){
        let { height, width } = Dimensions.get('window');
        return (
            <ImageBackground source={require("../../../../assets/concrete-background.png")} style={{width,height}}>
                <Container>
                    <AppHeader/>
                    <Content>
                        <ScrollView>
                            <Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Current Accepted Orders</Text>
                            {this.displayTableHeader()}
                            {this.displayTableData()}
                            <View style={styles.registerButton}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("RepHome")}>
                                    <Text style = {styles.buttonText}>Back To Home</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }
}

