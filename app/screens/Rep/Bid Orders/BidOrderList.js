import * as React from 'react';
import {ScrollView,InteractionManager} from 'react-native';
import {Button, Text, Content, Footer, FooterTab} from 'native-base';
import {withNavigation} from 'react-navigation';

import {connect} from "react-redux";
import {actions} from '../../../store';

//Custom Components
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import CustomTable from '../../../components/Tables/CustomTable'

import {styles} from '../styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";
import AppFooter from "../../../components/Footer/AppFooter";
import EmptyTable from "../../../components/Tables/EmptyTable";
import StatusRow from "../../../components/Tables/StatusRow";
import {SkeletonLoading} from "../../../components/App/SkeletonLoading";


class BidOrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Order No.', 'Suburb', 'Cubic m'],
            rowColumns: ["id", "order_concrete.suburb", "order_concrete.quantity"],
            emptyMsg: "Currently, there is no orders available.",
            reRender:false
        };
        this._showDetails = this._showDetails.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.interval = setInterval(()=>{
                this.props.getRepBidOrders();
            }, 6000);
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            clearInterval(this.interval);
        });

        this.showCustomRow = this.showCustomRow.bind(this);
    }

    componentDidMount() {
        this.props.getRepBidOrders();
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
        this.blurListener.remove();
    }

    _showDetails(rowData) {
        this.props.navigation.navigate("Bid Order Detail", {orderDetail: rowData});
    }

    showComponentButton(row) {

    }

    showCustomRow(row) {
        return <StatusRow row={row} onBtnClick={this._showDetails}/>;
    }

    showContent(orders) {
        // console.log(orders);
        return orders.size < 1 ? <EmptyTable message={this.state.emptyMsg}/>
            : <CustomTable bgStyle={[appStyles.bgWhite]}
                           rowHeaders={this.state.rowHeaders}
                           rowData={orders} rowColumns={this.state.rowColumns}
                           colButtonComponent={this.showComponentButton}
                           customRowComponent={this.showCustomRow}
                           buttonText="View" onPress={this._showDetails}/>;
    }

    render() {
        let bidding_orders = this.props.bid?.get("bid_orders")?.get("data");

        return (
            <AppBackground alignTop>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="Orders Requests"/>
                    <Content>
                        {this.props.app.get("loading") ? <SkeletonLoading/>
                            : this.showContent(bidding_orders)}
                    </Content>
                </ScrollView>
                <AppFooter/>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepBidOrders: () => {
            return dispatch(actions.bid.getRepBidOrders())
        }
    }
};

const mapStateToProps = (state) => {
    // const {order, app} = state;
    return {
        bid: state.get("bid"),
        app: state.get("app")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(BidOrderList));
