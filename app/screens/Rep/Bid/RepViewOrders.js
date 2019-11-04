import * as React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {Grid, Col, Row, View, Button, Text, Content, Footer, FooterTab} from 'native-base';
import {withNavigation} from 'react-navigation';

import {connect} from "react-redux";
import {actions, States} from '../../../store';

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/AppHeader";
import SubHeader from "../../../components/SubHeader";

import {styles} from '../styles.js';
import {appStyles} from '../../assets/app_styles.js';


class RepViewOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Suburb', 'Cubic m', '']
        };

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getAllOrder();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    componentDidMount() {
        this.props.getAllOrder();
        if (typeof this.props.navigation.state.params !== "undefined") {
            console.log(this.props.navigation.state.params);
        }
    }

    _alertIndex(rowData) {
        this.props.navigation.navigate("Order Details", {orderDetail: rowData});
    }

    displayTableHeader() {
        return (
            <Row>
                <Grid style={{marginTop: 20, borderBottomWidth: 2, borderBottomColor: 'grey',}}>
                    {this.state.tableHead.map((rowData, index) => (
                        <Col key={index} style={{marginLeft: 10,}}>
                            <Text>{rowData}</Text>
                        </Col>
                    ))}
                </Grid>
            </Row>
        );
    }

    displayTableData() {
        let order=this.props.order.toJS();
        return order.orders.map((rowData, index) => (
            <Row key={index}>
                <Grid style={[styles.tableBorder, {marginTop: 10}]}>
                    <Col>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col>
                        <Text>{rowData["order_concrete"] != null ? rowData["order_concrete"].suburb : ""}</Text>
                    </Col>
                    <Col>
                        <Text>{rowData["order_concrete"] != null ? rowData["order_concrete"].quantity : ""}</Text>
                    </Col>
                    <Col>
                        <View>
                            <TouchableOpacity onPress={() => this._alertIndex(rowData)}>
                                <Text style={{textAlign: 'center'}}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </Col>
                </Grid>
            </Row>
        ));
    }

    render() {
        let app=this.props.app.toJS();
        return (
            <AppBackground alignTop loading={app.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconName="clipboard" title="View Orders Requests"/>
                    <Content contentContainerStyle={[styles.content, appStyles.bgWhite, appStyles.mb_10]}>
                        {this.displayTableHeader()}
                        {this.displayTableData()}
                    </Content>
                </ScrollView>
                <Footer>
                    <FooterTab>
                        <Button style={[appStyles.button, appStyles.buttonPrimary]}
                                onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={appStyles.buttonBlack}>Back to Home</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </AppBackground>
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
    // const {order, app} = state;
    return {
        order:state.get("order"),
        app:state.get("app")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RepViewOrders));
