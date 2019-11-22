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
import EmptyTable from "../../../components/Tables/EmptyTable";


class CurrentAcceptedOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowHeaders: ['Order #', 'Status'],
            rowColumns: ["order.id", "order.status"],
            loading:true,
            emptyMessage:"There are no Accepted Orders right now."
        };
        this._alertIndex=this._alertIndex.bind(this);

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getRepAcceptedOrders().then((res)=>{
                this.setState({"loading":false})
            });
        });
    }

    _alertIndex(bid) {
        this.props.navigation.navigate("OrderStatus",{bid});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps.isFocused);
        // console.log()
    }

    render() {
        let app = this.props.app.toJS();
        let order = this.props.order.toJS();
        console.log(this.state.loading);
        return (
            <AppBackground loading={this.state.loading}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader iconType="ConcreteASAP" iconName="accepted-order" title="Current Accepted Order"/>
                    <Content>
                        <View style={[appStyles.bgWhite]}>
                            {order["accepted_orders"]["length"] !== 0?
                                <CustomTable rowHeaders={this.state.rowHeaders}
                                         rowData={order["accepted_orders"]} rowColumns={this.state.rowColumns}
                                         buttonText="View Details" onPress={this._alertIndex}/>:
                                <EmptyTable message={this.state.emptyMessage}/>}
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
         getRepAcceptedOrders: async () => {
            return await dispatch(actions.order.getRepAcceptedOrders())
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
