import * as React from 'react';
import {Button, Text, View} from 'native-base';

//redux
import {Field, formValueSelector, reduxForm} from "redux-form/immutable";
import {connect} from "react-redux";


//styles
import {appStyles} from "../../../../assets/styles/app_styles";

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'
import AdditionalOrderForm from "../../../components/contractor/AdditionalOrderForm";
import {actions} from "../../../store/modules";


class PlaceOrderAdditionalRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                "delivery_date":"13/10/2019",
                "delivery_date1":"20/11/2019",
                "delivery_date2":"20/12/2019",
                "time1":"20:00",
                "time2":"14:00",
                "time3":"10:00",
                "time_difference_deliveries":"10min",
                "urgency":"Immediate",
                "site_call":"On Site"
            }
        };
        this.currentTimeSelector = "";
        this.displayReview = this.displayReview.bind(this);
    }

    displayReview(values) {
        let order = this.props.navigation.getParam("order");
        let full_order=order.merge(values);

        this.props.removeAppLoading();

        this.props.navigation.navigate("SpecialRequests", {
            order: full_order
        })
    }


    render() {
        return (
            <AppBackground enableKeyBoard>
                <AppHeader backMenu/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Place Order"/>
                <AdditionalOrderForm onSubmit={this.displayReview}
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

const mapDispatchToProps = (dispatch) => {
    return {
        removeAppLoading: () => {
            return dispatch(actions.app.loading(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderAdditionalRequest);