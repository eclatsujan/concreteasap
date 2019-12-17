import * as React from 'react';
import {Content, View} from 'native-base';
import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import {connect} from "react-redux";
import {actions} from "../../../store/modules";

class pourDayDetail extends React.Component {

    render() {
        return (
            <AppBackground>
                <AppHeader/>
                <Content>
                    <SubHeader iconName="truck" title="Review Order"/>
                </Content>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (order) => {
            return dispatch(actions.order.createOrder(order))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.get("order")
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(pourDayDetail);