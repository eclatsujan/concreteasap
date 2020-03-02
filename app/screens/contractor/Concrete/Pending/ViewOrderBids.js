import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Footer, FooterTab} from 'native-base';

import {connect} from 'react-redux';
import {actions} from '../../../../store';

//styles
import {styles} from '../../styles.js';
import {appStyles} from "../../../../../assets/styles/app_styles";
import {withNavigationFocus} from "react-navigation";

// Custom Component
import AppBackground from '../../../../components/App/AppBackground';
import AppHeader from '../../../../components/Headers/AppHeader';
import SubHeader from '../../../../components/Headers/SubHeader';
import OrderView from '../../../../components/contractor/TableView/OrderView';
import {SkeletonLoading} from "../../../../components/App/SkeletonLoading";
import EmptyTable from "../../../../components/Basic/Tables/EmptyTable";
import AppFooter from "../../../../components/App/Footer/AppFooter";


class ViewOrderBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Order', 'Status', '', ''],
            loading: true,
            errorMsg:"There is no pending orders found."
        };

        this._showOrderBids = this._showOrderBids.bind(this);
        this._showFullDetails = this._showFullDetails.bind(this);
        this._archiveOrder = this._archiveOrder.bind(this);
        this.getOrders = this.getOrders.bind(this);

        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            this.props.getContractorPendingOrders();
        });

        this.blurListener = this.props.navigation.addListener('willBlur', () => {
            this.props.stopFetchingPendingOrders();
        });

        this.backButton=this.backButton.bind(this);
    }

    componentDidMount() {
        this.props.getContractorPendingOrders();
    }

    componentWillUnmount() {

    }

    async getOrders() {
        // await this.props.getContractorOrders();
    }

    _showOrderBids(order_id) {
        this.props.appLoading();
        this.props.navigation.navigate("ViewBids", {order_id});
    }

    _showFullDetails(order_concrete) {
        console.log(order_concrete);
        this.props.navigation.navigate("ViewOrderDetail", {order_concrete});
    }

    _archiveOrder(order) {
        this.props.archiveOrder(order.get("id"));
    }

    displayTableData(orders) {
        // console.log(orders);
        return orders?this.showTableData(orders):<EmptyTable message={this.state.errorMsg} />
    }

    showTableData(orders){
        return orders?.sort((a,b)=>{
            return b-a;
        })?.map((order_id,index) => (
            <OrderView order_id={order_id} buttonViewText={"View Bids"} key={index}
                       onBidHandler={this._showOrderBids} onArchiveHandler={this._archiveOrder}
                       onDetailHandler={this._showFullDetails}/>
        ));
    }

    backButton(){
        this.props.navigation.navigate("Home");
    }

    render() {
        let orders=this.props.pending_order?.get("data")?.get("result");
        return (
            <AppBackground loading={this.props.app.get("loading")} backBtnClick={this.backButton}>
                <ScrollView style={[appStyles.mb_10]}>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="Order Requests"/>
                    <Content contentContainerStyle={styles.content}>
                        <View style={[appStyles.bgWhite]}>
                            {this.displayTableData(orders)}
                        </View>
                    </Content>
                </ScrollView>
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
            return dispatch(actions.order.pendingOrder.archiveOrder(order_id));
            // return dispatch(actions.order.archiveOrder(order_id));
        },
        getContractorPendingOrders:()=>{
            return dispatch(actions.order.pendingOrder.fetchPendingOrders());
        },
        stopFetchingPendingOrders:()=>{
            return dispatch(actions.order.pendingOrder.stopFetchingPreviousOrders())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        pending_order:state.get("pending_order")
    };
};


export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(ViewOrderBids));
