import * as React from 'react';

//redux
import {connect} from "react-redux";

//styles
import {appStyles} from "../../../../../assets/styles/app_styles";

// Custom Component
import AppBackground from '../../../../components/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'
import AdditionalOrderForm from "../../../../components/contractor/AdditionalOrderForm";
import {formValueSelector} from "redux-form/lib/immutable";
import AppFooter from "../../../../components/Footer/AppFooter";


class ModifyAdditionalRequest extends React.Component {

    constructor(props) {
        super(props);
        this.displayReview = this.displayReview.bind(this);
    }

    displayReview(values) {
        let order = this.props.navigation.getParam("order");
        let order_id = this.props.navigation.getParam("order_id");
        const full_order = order.merge(values);
        let order_type=this.props.navigation.getParam("order_type")?this.props.navigation.getParam("order_type"):"accepted_orders";

        this.props.navigation.navigate("ModifySpecialRequests", {
            order: full_order,
            order_id,
            order_type
        });
    }

    render() {
        let order = this.props.navigation.getParam("order");
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Place Order"/>
                <AdditionalOrderForm onSubmit={this.displayReview} initialValues={order}
                                     selectedTime={this.props.time}/>
            </AppBackground>
        );
    }

}


const selector = formValueSelector('placeOrder');

const mapStateToProps = (state) => {
    return {
        time: selector(state, "time1", "time2", "time3"),
    }
};

export default connect(mapStateToProps, null)(ModifyAdditionalRequest);