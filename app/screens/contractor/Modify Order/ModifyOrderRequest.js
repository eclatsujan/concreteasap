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

class ModifyOrderRequest extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        let order_id = this.props.navigation.getParam("order_id");
        let order = values;
        order.type = "concrete";
        navigationHelper.navigate("ModifyAdditionalRequest", {
            "order": order,
            "order_id":order_id
        });
    }

    loadOrder() {
        let order = {};
        let order_id = this.props.navigation.getParam("order_id");
        if(order_id){

            let orders = this.props.orders.toJS();
            let accepted_order = orders["accepted_orders"].find((order) => {
                return order.id === order_id;
            });
            order = {
                "id":order_id,
                "suburb": accepted_order["order_concrete"]["suburb"],
                "type": accepted_order["order_concrete"].type,
                "mpa": accepted_order["order_concrete"].mpa,
                "agg": accepted_order["order_concrete"].agg,
                "slu": accepted_order["order_concrete"].slump,
                "acc": accepted_order["order_concrete"].acc,
                "placement_type": accepted_order["order_concrete"].placement_type,
                "quantity": accepted_order["order_concrete"].quantity.toString(),
                "delivery_date": accepted_order["order_concrete"].delivery_date,
                "delivery_date1": accepted_order["order_concrete"].delivery_date1,
                "delivery_date2": accepted_order["order_concrete"].delivery_date2,
                "time1": accepted_order["order_concrete"].time_preference1,
                "time2": accepted_order["order_concrete"].time_preference2,
                "time3": accepted_order["order_concrete"].time_preference3,
                "time_difference_deliveries": accepted_order["order_concrete"].time_deliveries,
                "urgency": accepted_order["order_concrete"].urgency,
                "message_required": accepted_order["order_concrete"].message_required ? "Yes" : "No",
                "site_call": accepted_order["order_concrete"].preference,
                "colours": accepted_order["order_concrete"].colours,
                "special_instructions": accepted_order["order_concrete"]["special_instructions"],
                "delivery_instructions": accepted_order["order_concrete"]["delivery_instructions"],
            };
        }
        return order;
    }

    render() {
        let order = this.loadOrder();
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Modify Order"/>
                <PlaceOrderForm onSubmit={this.handleSubmit} initialValues={order} />
            </AppBackground>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        orders: state.get("order")
    }
};

export default connect(mapStateToProps, null)(ModifyOrderRequest);

