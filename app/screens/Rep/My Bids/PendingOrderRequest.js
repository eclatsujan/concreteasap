import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from 'native-base';

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


class PendingOrderRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Order', 'Suburb', 'Cubic m', ''],
            rowColumns: ["id", "order_concrete.suburb", "order_concrete.quantity"]
        };
        this._showPendingOrder=this._showPendingOrder.bind(this);
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepPendingOrders();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    componentDidMount() {
        this.props.getRepPendingOrders();
    }

    _showPendingOrder(rowData) {
        this.props.navigation.navigate("Order Pending Details", {orderDetail: rowData});
    }

    render() {
        let app=this.props.app.toJS();
        let order=this.props.order.toJS();
        return <AppBackground alignTop>
            <ScrollView>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="order" title="View Orders Requests"/>
                <Content contentContainerStyle={[styles.content, appStyles.bgWhite, {marginBottom: 10}]}>
                    <CustomTable isLoading={app.loading} bgStyle={[appStyles.bgWhite,appStyles.p_15]} rowHeaders={this.state.rowHeaders}
                                 rowData={order["pending_orders"]} rowColumns={this.state.rowColumns}
                                 buttonText="View Details" onPress={this._showPendingOrder}/>
                </Content>
            </ScrollView>
            <AppFooter />
        </AppBackground>
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
