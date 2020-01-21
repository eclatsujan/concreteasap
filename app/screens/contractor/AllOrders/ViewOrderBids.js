import * as React from 'react';
import {ScrollView, ActivityIndicator, Alert, InteractionManager} from 'react-native';
import {Col, Row, View, Button, Text, Content, Icon, Footer, FooterTab} from 'native-base';

import {connect} from 'react-redux';
import {actions} from '../../../store';

import OneSignal from 'react-native-onesignal';

//styles
import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
import {withNavigation, withNavigationFocus} from "react-navigation";

// Custom Component
import AppBackground from '../../../components/AppBackground';
import AppHeader from '../../../components/Headers/AppHeader';
import SubHeader from '../../../components/Headers/SubHeader';
import OrderView from '../../../components/contractor/TableView/OrderView';
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";


class ViewOrderBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', '', ''],
            loading: true
        };

        this._showOrderBids = this._showOrderBids.bind(this);
        this._showFullDetails = this._showFullDetails.bind(this);
        this._archiveOrder = this._archiveOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);

        this.props.getContractorPendingOrders();
    }

    async getOrders() {
        // await this.props.getContractorOrders();
    }

    _showOrderBids(order_id) {
        this.props.appLoading();
        this.props.navigation.navigate("ViewBids", {order_id});
    }

    _showFullDetails(order_id) {
        this.props.navigation.navigate("ViewOrderDetail", {order});
    }

    _archiveOrder(order) {
        this.props.archiveOrder(order.get("id"));
    }

    displayTableData(orders) {
        // console.log()
        return orders.keySeq()?.map((order_id,index) => (
            <OrderView order_id={order_id} buttonViewText={"View Bids"} key={index}
                       onBidHandler={this._showOrderBids} onArchiveHandler={this._archiveOrder}
                       onDetailHandler={this._showFullDetails}/>
        ));
    }

    render() {
        let orders=this.props.pending_order.get("data").get("orders");
        return (
            <AppBackground>
                <ScrollView style={[appStyles.mb_10]}>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="Order Requests"/>
                    <Content contentContainerStyle={styles.content}>
                        <View style={[appStyles.bgWhite]}>
                            {this.props.app.get("loading") ? <SkeletonLoading/>
                                : this.displayTableData(orders)}
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
        appLoading: () => {
            return dispatch(actions.app.loading())
        },
        archiveOrder: (order_id) => {
            return dispatch(actions.order.archiveOrder(order_id));
        },
        getContractorPendingOrders:()=>{
            console.log("ok");
            return dispatch(actions.order.pendingOrder.fetchPendingOrders());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        // order: state.get("order"),
        pending_order:state.get("pending_order")
    };
};


export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(ViewOrderBids));
