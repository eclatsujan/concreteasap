import * as React from "react";
import {Field, reduxForm} from "redux-form/lib/immutable";

import {Button, Text, View} from "native-base";
import TimePicker from "react-native-24h-timepicker";

import {appStyles} from "../../screens/assets/app_styles";

import {formValidation} from "../../helpers/validation";

import csPicker from "../Forms/csPicker";

import {renderList} from "../../helpers/app";

import {orderForm} from "../../form/placeOrder";
import csDatePicker from "../Forms/csDatePicker";
import csTimePicker from "../Forms/csTimePicker";


class AdditionalOrderForm extends React.Component {

    openTimePicker(time_input) {
        this.TimePicker.open();

        this.currentTimeSelector = time_input;
    }

    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        let obj_name = this.currentTimeSelector;
        this.props.change(obj_name, hour + ":" + minute);
        this.TimePicker.close();
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View>
                <View>
                    <Text style={[appStyles.upperCase, appStyles.ft_small, appStyles.colorPrimary]}>
                        Please select 3 potential dates and 3 potential time slots for
                        delivery.
                    </Text>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Date Preference 1</Text>
                    <Field name="delivery_date" component={csDatePicker} placeholder={"Date Preference 1"}
                           validate={[formValidation.requiredSelect]}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Date Preference 2</Text>
                    <Field name="delivery_date1" component={csDatePicker} placeholder={"Date Preference 2"}
                           validate={[formValidation.requiredSelect]}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Date Preference 3</Text>
                    <Field name="delivery_date2" component={csDatePicker} placeholder={"Date Preference 3"}
                           validate={[formValidation.requiredSelect]}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Time Preference 1</Text>
                    <Field name="time1" placeholder="Time Preference 1" component={csTimePicker}
                           validate={[formValidation.requiredSelect]} onPress={() => this.openTimePicker("time1")}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Time Preference 2</Text>
                    <Field name="time2" component={csTimePicker} validate={[formValidation.requiredSelect]}
                           placeholder="Time Preference 2" onPress={() => this.openTimePicker("time2")}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Time Preference 3</Text>
                    <Field name="time3" component={csTimePicker} validate={[formValidation.requiredSelect]}
                           placeholder="Time Preference 3" onPress={() => this.openTimePicker("time3")}/>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Time Between Deliveries</Text>
                    <Field name="time_difference_deliveries" component={csPicker}
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.time_difference_deliveries)}
                    </Field>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Urgency</Text>
                    <Field name="urgency" component={csPicker} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.urgency)}
                    </Field>
                </View>

                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Site Call</Text>
                    <Field name="site_call" component={csPicker} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.site_call)}
                    </Field>
                </View>

                <TimePicker onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                            ref={ref => {
                                this.TimePicker = ref;
                            }}/>

                <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.horizontalCenter]}
                        onPress={handleSubmit(this.props.onSubmit)}>
                    <Text style={appStyles.buttonBlack}>Next</Text>
                </Button>
            </View>
        );
    }
}

let additionalOrderForm = reduxForm({
    form: "placeOrder",
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(AdditionalOrderForm);

export default additionalOrderForm;