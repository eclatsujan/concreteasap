import * as React from 'react';
import {Button, Text, View} from 'native-base';

//redux
import {formValues, formValueSelector} from "redux-form/immutable";
import {connect} from "react-redux";


//styles
import {appStyles} from "../../../../../assets/styles/app_styles";

// Custom Component
import AppBackground from '../../../../components/App/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'
import {actions} from "../../../../store/modules";
import ReoAdditionalForm from "../../../../components/contractor/REO/Order/ReoAdditionalData";


class ReoAdditionalOrderScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                // "delivery_date":"13/10/2019",
                // "delivery_date1":"20/11/2019",
                // "delivery_date2":"20/12/2019",
                // "time1":"20:00",
                // "time2":"14:00",
                // "time3":"10:00",
                // "time_difference_deliveries":"10min",
                // "urgency":"Immediate",
                // "site_call":"On Site"
            }
        };
        this.currentTimeSelector = "";
        this.displayReview = this.displayReview.bind(this);
    }

    displayReview() {
       this.props.navigation.navigate("Reo Special Order");
    }


    render() {
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <SubHeader iconType="ConcreteASAP" iconName="truck" title="Place Order"/>
                <ReoAdditionalForm onSubmit={this.displayReview}
                                     selectedTime={this.props.time}/>
            </AppBackground>
        );
    }

}

const selector = formValueSelector('placeReoOrder');

const mapStateToProps = (state) => {
    return {
        time: selector(state, "time1", "time2", "time3"),
        // order:state.get("form")?.get("placeReoOrder")?.get("values")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAppLoading: () => {
            return dispatch(actions.app.loading(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReoAdditionalOrderScreen);