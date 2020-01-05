import * as React from 'react';
//Custom Plugins for redux
import {connect} from 'react-redux';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader';


//helpers
import navigationHelper from "../../../helpers/navigationHelper";

//styles
import PlaceOrderForm from "../../../components/contractor/PlaceOrderForm";

import * as Immutable from 'immutable';
import {order_concrete} from "../../../store/schemas";

class ModifyOrderRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            quantity:""
        };
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    static getDerivedStateFromProps(props,state){
        let quantity={...state.quantity};
        if(props.navigation.getParam("total_quantity")){
            quantity=props.navigation.getParam("total_quantity");
        }
        return {
            quantity
        };
    }

    handleSubmit(values) {
        let order_type=this.props.navigation.getParam("order_type")?this.props.navigation.getParam("order_type"):"accepted_orders";
        let order_id = this.props.navigation.getParam("order_id");
        let order=values.set("type", "concrete");
        navigationHelper.navigate("ModifyAdditionalRequest", {
            "order": order,
            "order_id":order_id,
            order_type
        });
    }

    loadOrder(type) {
        let order = new Immutable.Map({});
        let order_id = this.props.navigation.getParam("order_id");

        if(order_id) {
            let orders = this.props.orders;
            let accepted_order = orders.get(type).get("data").find((order) => {
                return order.get("id") === order_id;
            });
            if(accepted_order){
                let colours = accepted_order.get("order_concrete").get("colours");
                let concrete = accepted_order.get("order_concrete");
                order=order.set("id", order_id).set("address", concrete.get("address"))
                    .set("suburb",concrete.get("suburb"))
                    .set("type", concrete.get("type")).set("type", concrete.get("type"))
                    .set("mpa", concrete.get("mpa")).set("agg", concrete.get("mpa"))
                    .set("agg", concrete.get("agg")).set("slu", concrete.get("slump"))
                    .set("acc", concrete.get("acc")).set("placement_type", concrete.get("placement_type"))
                    .set("quantity", concrete.get("quantity").toString()).set("delivery_date", concrete.get("delivery_date"))
                    .set("delivery_date1", concrete.get("delivery_date1"))
                    .set("delivery_date2", concrete.get("delivery_date2"))
                    .set("time1", concrete.get("time_preference1")).set("time2", concrete.get("time_preference2"))
                    .set("time3", concrete.get("time_preference3"))
                    .set("time_difference_deliveries", concrete.get("time_deliveries"))
                    .set("urgency", concrete.get("urgency"))
                    .set("message_required", concrete.get("message_required") ? "Yes" : "No")
                    .set("site_call", concrete.get("preference"))
                    .set("colour_required", colours !== "" ? "Yes" : "No")
                    .set("colours", colours)
                    .set("special_instructions", concrete.get("special_instructions"))
                    .set("delivery_instructions", concrete.get("delivery_instructions"));
            }
        }
        return order;
    }

    render() {
        let type=this.props.navigation.getParam("order_type")?this.props.navigation.getParam("order_type"):"accepted_orders";
        let order = this.loadOrder(type);
        console.log(order);
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Modify Order"/>
                <PlaceOrderForm onSubmit={this.handleSubmit} initialValues={order} quantity={this.state.quantity}
                                calculatorRoute={"Modify Order Calculator"}/>
            </AppBackground>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        orders: state.get("order"),
    }
};

export default connect(mapStateToProps, null)(ModifyOrderRequest);

