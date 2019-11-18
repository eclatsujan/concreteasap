import * as React from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Field, reduxForm} from "redux-form/lib/immutable";
import {Button, Picker, Text, View} from "native-base";
import {appStyles} from "../../screens/assets/app_styles";
import csTextBox from "../Forms/csTextBox";
import {formValidation} from "../../helpers/validation";
import csPicker from "../Forms/csPicker";
import {renderList} from "../../helpers/app";
import {orderForm} from "../../form/placeOrder";

class PlaceOrderForm extends React.Component {

    render() {
        const {handleSubmit} = this.props;
        return (
            <View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Post Code</Text>
                    <Field name="suburb" placeholder="Post Code" component={csTextBox} type="select"
                           validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Quantity</Text>
                    <Field name="quantity" keyboardType="numeric" placeholder="Quantity" component={csTextBox}
                           type="text" validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Type</Text>
                    <Field name="type" iosHeader="Type" component={csPicker}
                           validate={[formValidation.requiredSelect]}>
                        <Picker.Item value={""} label="Types"/>
                        <Picker.Item value="Standard Mix" label="Standard Mix"/>
                        <Picker.Item value="Block Fill" label="Block Fill"/>
                        <Picker.Item value="Long Line" label="Long Line"/>
                        <Picker.Item value="Temmi Mix" label="Temmi Mix"/>
                        <Picker.Item value="Spray Crete/Shot Crete" label="Spray Crete/Shot Crete"/>
                        <Picker.Item value="Kerb abd" label="Kerb abd"/>
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>MPA</Text>
                    <Field name="mpa" iosHeader="MPA" component={csPicker} mode="dropdown"
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.mpa)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>AGG</Text>
                    <Field name="agg" iosHeader="AGG" component={csPicker} mode="dropdown"
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.agg)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Slump</Text>
                    <Field name="slu" iosHeader="Slump" component={csPicker} mode="dropdown"
                           pickerChildren={orderForm.slu}
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.slu)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>ACC</Text>
                    <Field name="acc" iosHeader="ACC" mode="dropdown" component={csPicker}
                           pickerChildren={orderForm.acc} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.acc)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Placement Type</Text>
                    <Field name="placement_type" iosHeader="Placement Type" mode="dropdown" component={csPicker}
                           pickerChildren={orderForm.placement_types} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.placement_types)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Message Required Y/N</Text>
                    <Field name="message_required" iosHeader="Message Required Y/N" component={csPicker}
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.message_required)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Colour</Text>
                    <Field name="colours" placeholder="Colours" component={csTextBox} type="text"/>
                    <TouchableOpacity>
                        <View style={[appStyles.w_65, appStyles.flex1, appStyles.selfRight]}>
                            <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Link To Colour Site >></Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={appStyles.my_5}>
                    <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.horizontalCenter]}
                            onPress={handleSubmit(this.props.onSubmit)}>
                        <Text style={appStyles.buttonBlack}>Next</Text>
                    </Button>
                </View>
            </View>
        );
    }

}

let placeOrderForm = reduxForm({
    form: "placeOrder",
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(PlaceOrderForm);

export default placeOrderForm;