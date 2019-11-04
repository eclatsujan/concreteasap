import * as React from 'react';
import {TextInput, StyleSheet, Label, TouchableOpacity, ScrollView, ImageBackground, Dimensions} from 'react-native';
import { Grid,Col,Row,View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,Textarea, Form } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from '../styles.js';


import AppHeader from "../../../components/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/SubHeader";

import {appStyles} from "../../assets/app_styles";

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
                        <TouchableOpacity onPress={() => this._alertIndex(rowData.id)}>
                            <Text style={appStyles.colorBlack}>View Details</Text>
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </Row>
        ));
    }

    render(){
        let { height, width } = Dimensions.get('window');
        return (
            <AppBackground>
                <AppHeader/>
                <SubHeader>
                  <Row style={[appStyles.bgPrimary,appStyles.subHeader]}>
                    <View style={appStyles.subHeaderBg}></View>
                    <Col style={appStyles.iconCol}>
                      <Icon type="FontAwesome5" name="running" style={appStyles.headerIcon} />
                    </Col>
                    <Col style={appStyles.subHeaderTxtCol}>
                      <Text style={[appStyles.baseFont,appStyles.subHeaderTxt]}>Current Accepted Order</Text>
                    </Col>
                  </Row>
                </SubHeader>
                <Content>
                    <ScrollView style={[appStyles.bgWhite]}>
                        {this.displayTableHeader()}
                        {this.displayTableData()}
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
