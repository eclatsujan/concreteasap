import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Text, Content, Col, Row} from 'native-base';
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import {appStyles} from "../../../../assets/styles/app_styles";
import SubHeader from "../../../components/Headers/SubHeader";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {actions} from "../../../store/modules";
import EmptyTable from "../../../components/Tables/EmptyTable";
import OrderView from "../../../components/contractor/TableView/OrderView";
import CustomOrderView from "../../../components/contractor/TableView/CustomOrderView";
import * as Immutable from "immutable";

class PreviousOrdersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "emptyMsg": "There is no orders found."
        };
        this.focusListener = this.props.navigation.addListener("willFocus", () => {
            this.props.getPreviousOrders();
        });
        this.blurListener = this.props.navigation.addListener('willBlur', () => {
            this.props.stopGettingPreviousOrders();
        });
        this.archiveOrder = this.archiveOrder.bind(this);
        this.detailOrder = this.detailOrder.bind(this);
    }

    showContent() {
        let result = this.props.previous_orders?.get("data")?.get("result");
        return typeof result === "undefined" || result?.size === 0
            ? <EmptyTable emptyMsg={this.state.emptyMsg}/>
            : this.showOrders();
    }

    showOrders() {
        let results = this.props.previous_orders?.get("data")?.get("result");
        let previous_orders = this.props.previous_orders?.get("data")?.get("entities")?.get("orders");
        return results.map((order_id, index) => {
                let order = previous_orders?.get(order_id.toString());
                return <CustomOrderView order={order} key={index} onDetailHandler={this.detailOrder}
                                        onArchiveHandler={this.archiveOrder}/>
            }
        );
    }

    detailOrder(order_id) {
        this.props.navigation.navigate("Previous Order Detail", {
            order_id
        });
    }

    archiveOrder(order_id) {
        this.props.archiveOrder(order_id);
    }

    render() {
        let app=this.props.app;
        return (
            <AppBackground disableBack alignTop loading={app.get("loading")}>
                <ScrollView contentContainerStyle={[appStyles.flexGrow]} style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="prev-order" title="Previous Orders"/>
                    <View>
                        {this.showContent()}
                    </View>
                </ScrollView>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPreviousOrders: () => {
            return dispatch(actions.previous_orders.fetchPreviousOrders());
        },
        stopGettingPreviousOrders: () => {
            return dispatch(actions.previous_orders.stopFetchingPreviousOrders());
        },
        archiveOrder: (order_id) => {
            return dispatch(actions.previous_orders.removePreviousOrder(order_id));
        }
    }
};


const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        previous_orders: state.get("previous_orders")
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(PreviousOrdersList));
