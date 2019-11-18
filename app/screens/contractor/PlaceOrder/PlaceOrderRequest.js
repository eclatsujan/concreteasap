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

class PlaceOrderRequest extends React.Component {

    constructor(props) {
        super(props);
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
                <PlaceOrderForm onSubmit={this.handleSubmit} />
            </AppBackground>
        );
    }
}


export default connect(null, null)(PlaceOrderRequest);

