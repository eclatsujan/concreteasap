import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content, Row, Col, Text, Button, View, Icon} from 'native-base';

import {connect} from "react-redux";
import {actions} from "../../../store";

import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";

//Custom Components

import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";
import CustomTable from "../../../components/Tables/CustomTable";
import AppFooter from "../../../components/Footer/AppFooter";
import EmptyTable from "../../../components/Tables/EmptyTable";
import {getNested} from "../../../helpers/app";
import StatusRow from "../../../components/Tables/StatusRow";


class PendingOrderRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Order', 'Post Code', 'Cubic m3'],
            rowColumns: ["order.id", "order.order_concrete.suburb", "order.order_concrete.quantity"],
            emptyMessage: "There are no bids right now."
        };
        this._showPendingOrder = this._showPendingOrder.bind(this);
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepPendingOrders();
        });
        this.showCustomRow=this.showCustomRow.bind(this);
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    componentDidMount() {
        this.props.getRepPendingOrders();
    }

    _showPendingOrder(bidData) {
        this.props.navigation.navigate("Order Pending Details", {orderDetail: bidData});
    }

    showComponentButton(row) {

    }

    showCustomRow(row) {
        return <StatusRow row={row} onBtnClick={this._showPendingOrder}/>;
    }

    render() {
        let app = this.props.app.toJS();
        let bids = this.props.order.toJS();
        return (
            <AppBackground alignTop>
                <AppHeader/>
                <ScrollView>
                    <SubHeader iconType="ConcreteASAP" iconName="existing-order" title="My Bids"/>
                    <Content contentContainerStyle={[styles.content, appStyles.bgWhite, {marginBottom: 10}]}>
                        {bids["pending_orders"]["length"] !== 0 ?
                            <CustomTable isLoading={app.loading} bgStyle={[appStyles.bgWhite, appStyles.p_15]}
                                         rowHeaders={this.state.rowHeaders}
                                         rowData={bids["pending_orders"]} rowColumns={this.state.rowColumns}
                                         colButtonComponent={this.showComponentButton}
                                         customRowComponent={this.showCustomRow}
                                         buttonText="View Details" onPress={this._showPendingOrder}/>
                            : <EmptyTable message={this.state.emptyMessage}/>}
                    </Content>
                </ScrollView>
                <AppFooter/>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepPendingOrders: () => {
            return dispatch(actions.order.getRepPendingOrder())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PendingOrderRequest);
