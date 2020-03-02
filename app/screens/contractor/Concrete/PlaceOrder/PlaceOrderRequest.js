import * as React from 'react';
//Custom Plugins for redux
import {connect} from 'react-redux';
// Custom Component
import AppBackground from '../../../../components/App/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader';
//helpers
import navigationHelper from "../../../../helpers/navigationHelper";

//styles
import PlaceOrderForm from "../../../../components/contractor/Concrete/Order/PlaceOrderForm";

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
        this.backButton=this.backButton.bind(this);

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

    backButton(){
        let back=this.props.navigation.getParam("backRoute");
        this.props.navigation.navigate("Home");
        // this.props.navigation.dispatch(this.props.navigation.navigate(back));
    }

    render() {

        return (
            <AppBackground enableKeyBoard backBtnClick={this.backButton}>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Place Order"/>
                <PlaceOrderForm onSubmit={this.handleSubmit} quantity={this.state.quantity} backRoute={"PlaceOrderRequest"}
                                calculatorRoute={"orderCalculator"}/>
            </AppBackground>
        );
    }
}


export default connect(null, null)(PlaceOrderRequest);

