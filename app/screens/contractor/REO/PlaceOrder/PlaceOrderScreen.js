import * as React from 'react';
import {ScrollView} from 'react-native';
import AppBackground from "../../../../components/App/AppBackground";
import AppHeader from "../../../../components/Headers/AppHeader";
import PlaceReoOrderForm from "../../../../components/contractor/REO/Order/PlaceReoOrderForm";
import {connect} from "react-redux";
import SubHeader from "../../../../components/Headers/SubHeader";

class PlaceOrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.navigation.navigate("Accessories Order");
    }

    render() {
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <SubHeader bgColor={"#30C5E1"} iconType="ConcreteASAP" iconName="mesh" title="Place REO Request"/>
                <PlaceReoOrderForm onSubmit={this.handleSubmit} backRoute={"PlaceOrderRequest"}
                                   calculatorRoute={"orderCalculator"}/>

            </AppBackground>
        );
    }
}

export default connect(null, null)(PlaceOrderScreen);