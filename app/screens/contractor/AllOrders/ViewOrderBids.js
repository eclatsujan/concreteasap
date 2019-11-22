import * as React from 'react';
import {TouchableHighlight, ScrollView, ActivityIndicator,Alert} from 'react-native';
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
import ButtonIcon from "../../../components/Button/ButtonIcon";
import CustomTable from "../../../components/Tables/CustomTable";
import {app} from "../../../store/modules/app";
import OrderView from '../../../components/contractor/TableView/OrderView'

class ViewOrderBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', '', ''],
            loading: true
        };
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({loading: true});
            this.getOrders().then(() => {
                this.setState({loading: false});
            });
        });
        this._alertIndex=this._alertIndex.bind(this);
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
        if(order["status"]==="Complete"||order["status"]==="Cancelled"){
            this.props.navigation.navigate("ViewOrderDetail",{order});
        }
        else{
            this.props.navigation.navigate("ViewBids", {order});
        }
    }

    _archiveOrder(order){
        Alert.alert("Archive Message","Coming Soon");
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

    getStatusText(status){
        let text="View Details";
        if(status==="Pending"||status==="Open"){
            text="View Bids";
        }
        return text;

    }

    displayTableData() {
        if (this.state.loading) {
            return (<ActivityIndicator/>);
        }
        let order = this.props.order.toJS();
        return order.pending_orders.map((order, index) => (
            <OrderView order={order} buttonViewText={this.getStatusText(order["status"])} key={index}
                       onViewHandler={this._alertIndex} onArchiveHandler={this._archiveOrder} />
        ));
    }

    render() {
        let app = this.props.app.toJS();
        return (
            <AppBackground>
                <ScrollView style={[appStyles.mb_10]}>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="View Order Requests"/>
                    <Content contentContainerStyle={styles.content}>
                        <View style={[appStyles.bgWhite, appStyles.p_5]}>
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
