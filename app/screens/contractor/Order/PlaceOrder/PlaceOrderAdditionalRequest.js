import * as React from 'react';
import {Button, Text} from 'native-base';

//Custom Plugins
import TimePicker from "react-native-24h-timepicker";
//redux
import {Field, reduxForm} from "redux-form/immutable";
import {connect} from "react-redux";

// Custom Component
import AppBackground from '../../../../components/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

import {orderForm} from "../../../../form/placeOrder";
import csPicker from "../../../../components/Forms/csPicker";
import {formValidation} from "../../../../helpers/validation";
import csDatePicker from "../../../../components/Forms/csDatePicker";
import csTimePicker from "../../../../components/Forms/csTimePicker";
import {renderList} from "../../../../helpers/app";


//styles
import {appStyles} from "../../../assets/app_styles";

class PlaceOrderAdditionalRequest extends React.Component {

    constructor(props) {
        super(props);

        this.currentTimeSelector = "";
        this.displayReview = this.displayReview.bind(this);
    }

    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        let obj_name = this.currentTimeSelector;

        this.props.change(obj_name, hour + ":" + minute);
        this.TimePicker.close();
    }


    displayReview(values) {
        let order = this.props.navigation.getParam("order");
        order=order.toJS();
        let newValues=values.toJS();
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

    openTimePicker(time_input) {
        this.TimePicker.open();

        this.currentTimeSelector = time_input;
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <AppBackground enableKeyBoard>
                <AppHeader backMenu/>
                <SubHeader iconName="clipboard" title="Place Order Request"/>

                <Field name="delivery_date" component={csDatePicker}
                       validate={[formValidation.requiredSelect]}/>

                <Field name="delivery_date2" component={csDatePicker}
                       validate={[formValidation.requiredSelect]}/>

                <Field name="delivery_date3" component={csDatePicker}
                       validate={[formValidation.requiredSelect]}/>

                <Field name="time1" placeholder="Time 1" component={csTimePicker}
                       validate={[formValidation.requiredSelect]} onPress={() => this.openTimePicker("time1")}/>

                <Field name="time2" component={csTimePicker} validate={[formValidation.requiredSelect]}
                       placeholder="Time 2" onPress={() => this.openTimePicker("time2")}/>

                <Field name="time3" component={csTimePicker} validate={[formValidation.requiredSelect]}
                       placeholder="Time 3" onPress={() => this.openTimePicker("time3")}/>

                <Field name="time_difference_deliveries" component={csPicker}
                       validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.time_difference_deliveries)}
                </Field>

                <Field name="urgency" component={csPicker} validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.urgency)}
                </Field>

                <Field name="site_call" component={csPicker} validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.site_call)}
                </Field>

                <TimePicker onCancel={() => this.onCancel()} onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                            ref={ref => {
                                this.TimePicker = ref;
                            }}/>

                <Button style={[appStyles.button,appStyles.buttonPrimary,appStyles.horizontalCenter]} onPress={handleSubmit(this.displayReview)}>
                    <Text style={appStyles.buttonBlack}>Next</Text>
                </Button>
            </AppBackground>
        );
    }

}

let orderFormDateRedux = reduxForm({form: "order Date Request"})(PlaceOrderAdditionalRequest);


export default connect(state => ({
    // alternatively, you can set initial values here...
    initialValues: {
        // delivery_date:"2019/10/12",
        // time_difference_deliveries:"8am-10am",
        // time1:"08:00",
        // time2:"09:00",
        // time3:"10:00",
        // urgency:"Immediate",
        // site_call:"On Call",
        // firstName: 'some value here'
    }
}))(orderFormDateRedux);