import * as React from 'react';
import {ScrollView} from 'react-native';
import {View,Col, Row, Button, Text, Content, Footer, FooterTab} from 'native-base';

//Third Party
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
import {ActivityIndicator} from "react-native-paper";

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../assets/app_styles";
import {actions} from "../../../store/modules";


class ViewBids extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            params: props.navigation.state.params,
            tableHead: ['Bids', '$', 'Company'],
            tableData: [],
        };
    }

    componentWillMount() {
        let order = this.state.params.order;
        this.setState({tableData: order["bids"]});
    }

    displayTableHeader() {
        return (
            <Row style={appStyles.borderBottom}>
                {this.state.tableHead.map((rowData, index) => (
                    <Col key={index} style={index === this.state.tableHead.length - 1 ? appStyles.w_35 : null}>
                        <Text style={appStyles.upperCase}>{rowData}</Text>
                    </Col>
                ))}
            </Row>
        );
    }

    acceptBid(bid_id) {
        let order = this.state.params.order;
        this.props.navigation.navigate("OrderBidStatus",{
            bid_id,
            order
        });
    }

    rejectBid(bid_id,order_id){
        this.props.rejectBid(bid_id,order_id);
    }

    displayTableData(order) {
        return order["bids"].map((rowData, index) => (
            <View key={index}  style={[appStyles.borderBottom, appStyles.py_10, appStyles.verticalCenter]}>
                <Row >
                    <Col>
                        <Text>{rowData.id}</Text>
                    </Col>
                    <Col>
                        <Text>{rowData.price}</Text>
                    </Col>
                    <Col>
                        <Text>{rowData["user_id"]}</Text>
                    </Col>
                </Row>
                <Row style={appStyles.pt_5}>
                    <Col>
                        <Button
                            style={[appStyles.bgBlack, appStyles.borderRadiusDefault, appStyles.horizontalCenter, appStyles.w_90]}
                            onPress={() => {
                                this.acceptBid(rowData["id"])
                            }}>
                            <Text style={appStyles.ft_small}>Accept</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button danger
                                style={[appStyles.borderRadiusDefault, appStyles.horizontalCenter, appStyles.w_90]}
                                onPress={() => {
                                    this.rejectBid(rowData["id"],rowData["order_id"])
                                }}>
                            <Text style={appStyles.ft_small}>Reject</Text>
                        </Button>
                    </Col>
                </Row>
            </View>
        ));
    }

    render() {
        let param_order = this.state.params.order;
        let app=this.props.app.toJS();
        let orders=this.props.order.toJS();
        let order=orders["pending_orders"].find((order)=>order.id===param_order.id);
        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader  iconType="ConcreteASAP" iconName="pending-order" title="View Bids"/>
                    <Content contentContainerStyle={[appStyles.bgWhite, appStyles.p_5]}>
                        {this.displayTableHeader()}
                        {!app.loading?this.displayTableData(order):<ActivityIndicator size="large" />}
                    </Content>
                </ScrollView>
                <Footer style={{marginBottom: 30}}>
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
        rejectBid: (bid_id,order_id) => {
            return dispatch(actions.order.rejectBid(bid_id,order_id));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        order: state.get("order")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ViewBids));
