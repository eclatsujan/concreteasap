import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from 'native-base';

import {connect} from "react-redux";
import {actions} from "../../../store";

import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";
import CustomTable from "../../../components/Tables/CustomTable";
import AppFooter from "../../../components/Footer/AppFooter";
import EmptyTable from "../../../components/Tables/EmptyTable";
import StatusRow from "../../../components/Tables/StatusRow";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";

//Custom Components


class PendingOrderRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Job No', 'Post Code', 'Cubic m3'],
            rowColumns: ["order.job_id", "order.order_concrete.suburb", "order.order_concrete.quantity"],
            emptyMessage: "There are no bids right now."
        };
        this._showPendingOrder = this._showPendingOrder.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepPendingOrders();
            this.interval = setInterval(this.props.getRepPendingOrders, 10000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });

        this.showCustomRow = this.showCustomRow.bind(this);
    }

    componentDidMount() {
        this.props.getRepPendingOrders();
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
        this.blurListener.remove();
    }

    _showPendingOrder(bidData) {
        this.props.navigation.navigate("Pending Bid Detail", {orderDetail: bidData});
    }

    showComponentButton(row) {

    }

    showCustomRow(row) {
        return <StatusRow row={row} onBtnClick={this._showPendingOrder}/>;
    }

    showContent(bids) {
        return bids.size !== 0 ? <CustomTable bgStyle={[appStyles.bgWhite]}
                                                   rowHeaders={this.state.rowHeaders}
                                                   rowData={bids} rowColumns={this.state.rowColumns}
                                                   colButtonComponent={this.showComponentButton}
                                                   customRowComponent={this.showCustomRow}
                                                   buttonText="View Details" onPress={this._showPendingOrder}/>
            : <EmptyTable message={this.state.emptyMessage}/>
    }

    render() {
        let pending_bids = this.props.bid.get("pending_bids").get("data");
        return (
            <AppBackground alignTop loading={this.props.app.get("loading")}>
                <AppHeader/>
                <ScrollView>
                    <SubHeader iconType="ConcreteASAP" iconName="existing-order" title="My Bids"/>
                    <Content contentContainerStyle={[styles.content, appStyles.bgWhite, {marginBottom: 10}]}>
                        {this.showContent(pending_bids)}
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepPendingOrders: () => {
            return dispatch(actions.bid.getRepPendingBids())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        bid: state.get("bid"),
        app: state.get("app")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PendingOrderRequest);
