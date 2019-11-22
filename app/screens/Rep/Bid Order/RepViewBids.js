import * as React from 'react';
import {ScrollView} from 'react-native';
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
import {appStyles} from '../../assets/app_styles.js';
import AppFooter from "../../../components/Footer/AppFooter";
import EmptyTable from "../../../components/Tables/EmptyTable";
import StatusRow from "../../../components/Tables/StatusRow";


class RepViewBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Order No.', 'Suburb', 'Cubic m'],
            rowColumns: ["id", "order_concrete.suburb", "order_concrete.quantity"],
        };
        this._showDetails = this._showDetails.bind(this);
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getBiddingOrders();
        });
        this.showCustomRow=this.showCustomRow.bind(this);
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    componentDidMount() {
        this.props.getBiddingOrders();
        if (typeof this.props.navigation.state.params !== "undefined") {
            console.log(this.props.navigation.state.params);
        }
    }

    _showDetails(rowData) {
        console.log(rowData);
        this.props.navigation.navigate("View Bid Detail", {orderDetail: rowData});
    }

    showComponentButton(row) {

    }

    showCustomRow(row) {
        return <StatusRow row={row} onBtnClick={this._showDetails}/>;
    }

    render() {
        let app = this.props.app.toJS();
        let order = this.props.order.toJS();
        return (
            <AppBackground alignTop>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="pending-order" title="View Orders Requests"/>
                    <Content>
                        <CustomTable isLoading={app.loading} bgStyle={[appStyles.bgWhite, appStyles.p_15]}
                                     rowHeaders={this.state.rowHeaders}
                                     rowData={order["bidding_orders"]} rowColumns={this.state.rowColumns}
                                     colButtonComponent={this.showComponentButton}
                                     customRowComponent={this.showCustomRow}
                                     buttonText="View" onPress={this._showDetails}/>
                    </Content>
                </ScrollView>
                <AppFooter/>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBiddingOrders: () => {
            return dispatch(actions.order.getBiddingOrders())
        }
    }
};

const mapStateToProps = (state) => {
    // const {order, app} = state;
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RepViewBids));
