import * as React from 'react';
import {TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {Col, Row, View, Button, Text, Content, Icon, Footer, FooterTab} from 'native-base';

import {connect} from 'react-redux';
import {actions} from '../../../store';

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../assets/app_styles";
import {withNavigation} from "react-navigation";

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'
import HomeButton from "../../../components/Button/HomeButton";

class ViewOrderBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', ''],
            loading: true
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({loading: true});
            this.getOrders().then(() => {
                this.setState({loading: false});
            });
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    componentDidMount() {
        this.setState({loading: true});
        this.getOrders().then((res) => {
            this.setState({loading: false});
        })
    }

    async getOrders() {
        await this.props.getContractorOrders();
    }

    _alertIndex(order) {
        this.props.navigation.navigate("ViewBids", {order});
    }

    displayTableHeader() {

        return (
            <Row style={[appStyles.borderBottom, appStyles.pb_15]}>
                {this.state.tableHead.map((header_text, index) => (
                    <Col key={index}>
                        <Text>{header_text}</Text>
                    </Col>
                ))}
            </Row>
        );
    }

    getColor(status){
        let status_colors={"Complete":"#2E7400","Cancelled":"#FF0000"};
        let color=status_colors[status]?status_colors[status]:"#000000";
        return {color};
    }

    displayTableData() {
        if (this.state.loading) {
            return (<ActivityIndicator/>);
        }
        let order = this.props.order.toJS();
        return order.pending_orders.map((order, index) => (
            <Row key={index} style={[appStyles.borderBottom, appStyles.py_10]}>
                <Col><Text>{order.id}</Text></Col>
                <Col><Text style={this.getColor(order.status)}>{order.status}</Text></Col>
                <Col>
                    {order.status !== "Pending" ? null :
                        <TouchableOpacity onPress={() => this._alertIndex(order)}>
                            <View style={appStyles.flexRow}>
                                <View style={appStyles.w_25}>
                                    <Icon type="FontAwesome5" name="eye" style={appStyles.ft_20}/>
                                </View>
                                <View style={appStyles.w_75}>
                                    <Text>View Bids</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                </Col>
            </Row>
        ));
    }

    render() {
        let app = this.props.app.toJS();
        return (
            <AppBackground>
                <ScrollView style={[appStyles.mb_10]}>
                    <AppHeader/>
                    <SubHeader  iconType="ConcreteASAP" iconName="pending-order" title="View Order Requests"/>
                    <Content contentContainerStyle={styles.content}>
                        <View style={[appStyles.bgWhite, appStyles.p_5]}>
                            {this.displayTableHeader()}
                            {app.loading ? <ActivityIndicator size="large"/> : this.displayTableData()}
                        </View>
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
        getContractorOrders: () => {
            return dispatch(actions.order.getContractorOrders())
        },
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        order: state.get("order")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ViewOrderBids));
