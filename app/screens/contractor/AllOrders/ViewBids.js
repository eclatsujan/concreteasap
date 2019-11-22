import * as React from 'react';
import {ScrollView, TouchableHighlight} from 'react-native';
import {View, Col, Row, Button, Text, Content, Footer, FooterTab, Icon} from 'native-base';

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
import {appStyles} from "../../../../assets/styles/app_styles";
import {actions} from "../../../store/modules";
import EmptyTable from "../../../components/Tables/EmptyTable";


class ViewBids extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            params: props.navigation.state.params,
            tableHead: ['Bids', 'Amount', 'Company', ''],
            tableData: [],
            emptyMessage: "There is no bids placed at the moment."
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
                    <Col key={index}>
                        <Text style={[appStyles.upperCase, appStyles.baseSmallFontSize]}>{rowData}</Text>
                    </Col>
                ))}
            </Row>
        );
    }

    acceptBid(bid_id) {
        let order = this.state.params.order;
        this.props.navigation.navigate("OrderBidStatus", {
            bid_id,
            order
        });
    }

    rejectBid(bid_id, order_id) {
        this.props.rejectBid(bid_id, order_id);
    }

    displayTableData(order) {
        console.log(order["bids"]);
        return order["bids"].map((rowData, index) => (
            <View key={index} style={[appStyles.borderBottom, appStyles.paddingYDefault, appStyles.verticalCenter]}>
                <Row style={appStyles.verticalCenter}>
                    <Col>
                        <Text style={appStyles.baseSmallFontSize}>{rowData.id}</Text>
                    </Col>
                    <Col>
                        <Text style={appStyles.baseSmallFontSize}>${rowData.price}</Text>
                    </Col>
                    <Col>
                        <Text style={appStyles.baseSmallFontSize}>{rowData["user"]["detail"]["company"]}</Text>
                    </Col>
                    <Col>
                        <View style={[appStyles.flexRow, appStyles.justifyRight]}>
                            <View style={appStyles.pr_15}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.acceptBid(rowData["id"])
                                    }}>
                                    <Icon name={"check-circle"} style={appStyles.colorSuccess} type={"FontAwesome5"}/>
                                </TouchableHighlight>

                            </View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.rejectBid(rowData["id"], rowData["order_id"])
                                    }}>
                                    <Icon name={"times-circle"} style={appStyles.colorDanger} type={"FontAwesome5"}/>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Col>
                </Row>
            </View>
        ));
    }

    renderEmptyRow() {
        return (
            <EmptyTable message={this.state.emptyMessage}/>
        );
    }

    renderBidRow(order) {
        console.log(order["bids"].length);
        if (order["bids"].length > 0) {
            return (
                <View>
                    {this.displayTableHeader()}
                    {this.displayTableData(order)}
                </View>
            )
        } else {
            return this.renderEmptyRow();
        }
    }

    render() {
        let param_order = this.state.params.order;
        let app = this.props.app.toJS();
        let orders = this.props.order.toJS();
        let order = orders["pending_orders"].find((order) => order.id === param_order.id);
        return (
            <AppBackground loading={app.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="View Bids"/>
                    <Content contentContainerStyle={[appStyles.bgWhite, appStyles.p_10]}>
                        {this.renderBidRow(order)}
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
        rejectBid: (bid_id, order_id) => {
            return dispatch(actions.order.rejectBid(bid_id, order_id));
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
