import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content, View} from 'native-base';

import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

import AppHeader from "../../../components/Headers/AppHeader";
import AppBackground from "../../../components/AppBackground";
import SubHeader from "../../../components/Headers/SubHeader";
import CustomTable from '../../../components/Tables/CustomTable'
import AppFooter from "../../../components/Footer/AppFooter";


import {appStyles} from "../../assets/app_styles";
import {actions} from "../../../store/modules";


class CurrentAcceptedOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Order #', 'Status'],
            rowColumns: ["order.id", "order.status"],
            loading:true
        };
        this._alertIndex=this._alertIndex.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepAcceptedOrders();
        });
    }

    _alertIndex(bid) {
        this.props.navigation.navigate("OrderStatus",{bid});
    }

    render() {
        let app = this.props.app.toJS();
        let order = this.props.order.toJS();
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title="Current Accepted Order"/>
                    <Content>
                        <View style={[appStyles.bgWhite]}>
                            <CustomTable isLoading={app.loading} rowHeaders={this.state.rowHeaders}
                                         rowData={order["accepted_orders"]} rowColumns={this.state.rowColumns}
                                         buttonText="View Details" onPress={this._alertIndex}/>
                        </View>
                    </Content>
                </ScrollView>
                <AppFooter/>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepAcceptedOrders: () => {
            return dispatch(actions.order.getRepAcceptedOrders())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        order: state.get("order")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CurrentAcceptedOrder));
