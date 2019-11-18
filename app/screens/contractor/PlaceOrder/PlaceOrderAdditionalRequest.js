import * as React from 'react';
import {Button, Text, View} from 'native-base';

//redux
import {Field, reduxForm} from "redux-form/immutable";
import {connect} from "react-redux";


//styles
import {appStyles} from "../../assets/app_styles";

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'
import SpecialOrderForm from "../../../components/contractor/SpecialOrderForm";


class PlaceOrderAdditionalRequest extends React.Component {

    constructor(props) {
        super(props);

        this.currentTimeSelector = "";
        this.displayReview = this.displayReview.bind(this);
    }

    displayReview(values) {
        let order = this.props.navigation.getParam("order");
        order = order.toJS();
        let newValues = values.toJS();
        const full_order = {...order, ...newValues};
        if (full_order.message_required === "Yes") {
            this.props.navigation.navigate("SpecialRequests", {
                order: full_order
            })
        } else if (full_order.message_required === "No") {
            this.props.navigation.navigate("ReviewOrder", {
                order: full_order
            })
        }
    }



    render() {
        return (
            <AppBackground enableKeyBoard>
                <AppHeader backMenu/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Place Order"/>
                <SpecialOrderForm onSubmit={this.displayReview} />
            </AppBackground>
        );
    }

}

export default connect()(PlaceOrderAdditionalRequest);