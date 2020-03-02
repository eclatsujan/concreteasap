import * as React from 'react';
import {TouchableWithoutFeedback, ScrollView} from 'react-native';
import {View, Content, Icon} from 'native-base';

//Third Party
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

// Custom Component
import AppBackground from '../../../../components/App/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

//styles
import {appStyles} from "../../../../../assets/styles/app_styles";
import {actions} from "../../../../store/modules";
import EmptyTable from "../../../../components/Basic/Tables/EmptyTable";
import CustomTable from "../../../../components/Basic/Tables/CustomTable";
import AppFooter from "../../../../components/App/Footer/AppFooter";
import {SkeletonLoading} from "../../../../components/App/SkeletonLoading";

import * as pendingSagaActions from '../../../../store/modules/orders/actions';
import ButtonIcon from "../../../../components/Basic/Button/ButtonIcon";

class ViewBids extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            params: props.navigation.state.params,
            rowHeaders: ['Bids', 'Price m3', 'Company', ''],
            rowColumns: ["id", "price", "user.detail.company"],
            emptyMessage: "There is no bids placed at the moment."
        };
        // this.loadOrderBids = this.loadOrderBids.bind(this);
        this.showComponentButton = this.showComponentButton.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getContractorOrders();
        });

        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            this.props.stopFetchingPendingOrders();
        });
        this.acceptBid = this.acceptBid.bind(this);
    }

    componentDidMount() {
        this.props.getContractorOrders();
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }

    acceptBid(bid_id, order_id) {
        this.props.navigation.navigate("OrderBidStatus", {
            bid_id, order_id
        });
    }

    rejectBid(bid_id,order_id) {
        this.props.rejectBid(bid_id,order_id);
    }

    renderEmptyRow() {
        return (
            <EmptyTable message={this.state.emptyMessage}/>
        );
    }

    showComponentButton(rowData) {
        return (
            <View style={[appStyles.flexRow, appStyles.justifyRight]}>

                <ButtonIcon iconName={"check-circle"} iconType={"FontAwesome5"} btnBgColor={"#fff"}
                            iconColor={appStyles.colorSuccess} onPress={() => {
                    this.acceptBid(rowData.get("id"), rowData.get("order_id"))
                }}/>

                <ButtonIcon iconName={"times-circle"} iconType={"FontAwesome5"} btnBgColor={"#fff"}
                            iconColor={appStyles.colorDanger} onPress={() => {
                    this.rejectBid(rowData?.get("id"),rowData.get("order_id"))
                }}/>
            </View>
        );
    }

    showBidOutput(bids, length) {
        return length !== 0 ? <CustomTable bgStyle={[appStyles.bgWhite]}
                                           rowHeaders={this.state.rowHeaders}
                                           rowData={bids} rowColumns={this.state.rowColumns}
                                           colButtonComponent={this.showComponentButton}/>
            : <EmptyTable message={this.state.emptyMessage}/>
    }

    getOrder(order_id) {
        let pending_orders = this.props.pending_orders?.get("data")?.get("entities")?.get("orders");
        return pending_orders?.get(order_id.toString());
    }

    render() {
        let pending_bids = this.props.pending_orders?.get("data")?.get("entities")?.get("bids");
        let order_id = this.props.navigation.getParam("order_id");
        let order = this.getOrder(order_id);

        let bids = order?.get("bids").valueSeq().map((bid_id) => {
            return pending_bids.get(bid_id.toString());
        });
        return (
            <AppBackground loading={this.props.app.get("loading")}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="View Bids"/>
                    <Content>
                        {typeof order === "undefined" ? (
                            <View>
                                <EmptyTable message={"Bids has been already accepted."} />
                            </View>
                        ): this.showBidOutput(bids, bids?.size)}
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rejectBid: (bid_id, order_id) => {
            return dispatch(actions.order.pendingOrder.requestRejectBid(bid_id, order_id));
        },
        getContractorOrders: () => {
            return dispatch(actions.order.pendingOrder.fetchPendingOrders())
        },
        stopFetchingPendingOrders:()=>{
            return dispatch(actions.order.pendingOrder.stopFetchingPreviousOrders())
        },
        appLoading: () => {
            return dispatch(actions.app.loading())
        },
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        // order: state.get("order"),
        pending_orders: state.get("pending_order")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ViewBids));
