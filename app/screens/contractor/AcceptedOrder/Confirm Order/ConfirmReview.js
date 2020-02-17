//Core
import * as React from 'react';

import {ScrollView} from 'react-native';
//Native Base
import {Content} from 'native-base';

import {appStyles} from "../../../../../assets/styles/app_styles";

//App Component
import AppBackground from '../../../../components/AppBackground';
import AppHeader from '../../../../components/Headers/AppHeader'

import SubHeader from "../../../../components/Headers/SubHeader";

import {order} from "../../../../store/modules/order";
import {actions} from "../../../../store/modules";
import ConfirmReviewDetail from "../../../../components/contractor/Confirm/ConfirmReviewDetail";
import AppFooter from "../../../../components/Footer/AppFooter";

export default class ConfirmReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                quantity: "0"
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.onQuantityChange = this.onQuantityChange.bind(this);
    }

    // static getDerivedStateFromProps(props, state) {
    //     let initialValues = {...state.initialValues};
    //     const {params} = props.navigation.state;
    //     const order = params.order;
    //
    //     const order_concrete = order?.get("order_concrete");
    //     const bids = order?.get("bids").get(0);
    //     let message_m3=order?.get("message")?.get("quantity");
    //
    //     let message_total = parseFloat(order?.get("message")?.get("price"));
    //
    //     message_m3=!message_m3?0:parseFloat(message_m3);
    //
    //     message_total=!message_total?0:message_total;
    //
    //     if(order?.get("message")?.get("status")==="Rejected"){
    //         message_m3=0;
    //         message_total=0;
    //     }
    //
    //     message_m3=message_total===0?0:message_m3;
    //
    //     let total = (order_concrete?.get("quantity") * bids?.get("price"));
    //
    //     total=!total?0:total;
    //
    //     let total_m3 = parseFloat(order_concrete?.get("quantity")) + message_m3;
    //
    //     initialValues.quantity = order_concrete?.get("quantity").toString();
    //     initialValues.total = total?.toString();
    //     initialValues.message_m3 = message_m3.toString();
    //     initialValues.message_total = message_total.toString();
    //     initialValues.total_m3 =total_m3.toString();
    //     initialValues.total_amount = (total + message_total).toString();
    //
    //     return {
    //         initialValues
    //     };
    // }


    ratingCompleted(rating) {
        this.setState({rating});
    }

    handleSubmit(values) {
        let order_type = this.props.navigation.getParam("order_type") ? this.props.navigation.getParam("order_type") : "accepted_orders";
        this.props.navigation.navigate("Confirm Comment", {
            review: values,
            order_id: this.props.navigation.getParam("order_id"),
            order_type
        });
    }

    render() {
        let initialValues=this.props.navigation.getParam("initialValues");
        return (
            <AppBackground alignTop>
                <ScrollView style={[appStyles.pb_45]}>
                    <AppHeader/>
                    <SubHeader title="Job Complete" iconType="ConcreteASAP" iconName="accepted-order"/>
                    <Content style={[appStyles.bgWhite, appStyles.p_10]}>
                        <ConfirmReviewDetail onSubmit={this.handleSubmit} onQuantityChange={this.onQuantityChange}
                                             initialValues={initialValues}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}