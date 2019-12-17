import * as React from 'react';
//Custom Plugins for redux
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader';


//helpers
import navigationHelper from "../../../helpers/navigationHelper";

//styles
import PlaceOrderForm from "../../../components/contractor/PlaceOrderForm";

class PlaceOrderRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: "",
            initialValues: {
                "address":"54 Wentworth",
                "suburb":"2144",
                "quantity":"60",
                "type":"Block Fill Mix",
                "mpa":"32",
                "agg":"20",
                "slu":"80",
                "acc":"1% Bronze",
                "placement_type":"Chute",
                "message_required":"No",
                "colour_required":"No"
            }
        }

    }

    static getDerivedStateFromProps(props, state) {
        let quantity = {...state.quantity};
        if (props.navigation.getParam("total_quantity")) {
            quantity = props.navigation.getParam("total_quantity");
        }
        return {
            quantity
        };
    }

    handleSubmit(values) {
        let order = values;
        order.type = "concrete";
        navigationHelper.navigate("Place Order Additional Request", {
            "order": order
        });
    }

    render() {

        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Place Order"/>
                <PlaceOrderForm onSubmit={this.handleSubmit} quantity={this.state.quantity} backRoute={"PlaceOrderRequest"}/>
            </AppBackground>
        );
    }
}


export default connect(null, null)(PlaceOrderRequest);

