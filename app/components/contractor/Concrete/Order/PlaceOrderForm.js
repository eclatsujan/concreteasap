import * as React from "react";
import {TouchableOpacity, Linking} from "react-native";
import {Field, reduxForm, SubmissionError} from "redux-form/lib/immutable";
import {Button, Text, View} from "native-base";
import {appStyles} from "../../../../../assets/styles/app_styles";
import csTextBox from "../../../Basic/Forms/csTextBox";
import {formValidation} from "../../../../helpers/validation";
import csPicker from "../../../Basic/Forms/csPicker";
import {renderList} from "../../../../helpers/app";
import {orderForm} from "../../../../formValues/Concrete";
import csMapBoxPicker from "../../../Basic/Forms/csMapBoxPicker";
import navigationHelper from "../../../../helpers/navigationHelper";
import {showErrorMessage} from "../../../../helpers/error";
import CustomButton from "../../../Basic/Button/CustomButton";

class PlaceOrderForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showColor: false,
            errors: {},
            isError: false
        };
        this.onMapPick = this.onMapPick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCalculatorClick = this.onCalculatorClick.bind(this);
    }


    //To use calculator
    static getDerivedStateFromProps(props, state) {
        if (props.quantity !== "" && typeof props.quantity !== "object") {
            props.change("quantity", props.quantity);
        }

        return state;
    }

    onMapPick(value) {
        value["postcode"] ? this.props.change("post_code", value["postcode"]) : null;
        value["suburb"] ? this.props.change("suburb", value["suburb"]) : null;
        value["state"] ? this.props.change("state", value["state"]) : null;
    }

    onSelect(val) {
        this.setState({showColor: val === "Yes"});
    }

    onCalculatorClick() {
        navigationHelper.navigate(this.props["calculatorRoute"], {
            "backAction": true,
            "backRoute": this.props["backRoute"]
        });
    }

    onOpenColourURL() {
        Linking
            .openURL("http://www.concretecoloursystems.com.au/full-depth-coloured-concrete-swatches/")
            .catch((err) => {
                Alert.alert("URL Issue", err);
            });
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.boldFont, appStyles.baseLargeFontSize, appStyles.colorPrimary]}>
                        Address
                    </Text>
                    <Field name="address" placeholder="Address" component={csMapBoxPicker} onMapPick={this.onMapPick}
                           type="text" validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Post Code
                    </Text>
                    <Field name="post_code" placeholder="Post Code" keyboardType="numeric" component={csTextBox}
                           type="select"
                           validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Quantity (m3)
                    </Text>
                    <Field name="quantity" keyboardType="numeric" placeholder="Quantity (m3)" component={csTextBox}
                           iconType="calculator" iconClick={this.onCalculatorClick} type="text"
                           validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Type
                    </Text>
                    <Field name="type" iosHeader="Type" component={csPicker}
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.types)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        MPA
                    </Text>
                    <Field name="mpa" iosHeader="MPA" component={csPicker} mode="dropdown"
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.mpa)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        AGG
                    </Text>
                    <Field name="agg" iosHeader="AGG" component={csPicker} mode="dropdown"
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.agg)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Slump
                    </Text>
                    <Field name="slu" iosHeader="Slump" component={csPicker} mode="dropdown"
                           pickerChildren={orderForm.slu}
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.slu)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        ACC
                    </Text>
                    <Field name="acc" iosHeader="ACC" mode="dropdown" component={csPicker}
                           pickerChildren={orderForm.acc} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.acc)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Placement Type
                    </Text>
                    <Field name="placement_type" iosHeader="Placement Type" mode="dropdown" component={csPicker}
                           pickerChildren={orderForm.placement_types} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.placement_types)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Message Required Y/N
                    </Text>
                    <Field name="message_required" iosHeader="Message Required Y/N" component={csPicker}
                           validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.message_required)}
                    </Field>
                </View>

                <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Colour Required
                    </Text>
                    <Field name="colour_required" iosHeader="Colour Required" component={csPicker}
                           onSelectValue={this.onSelect} validate={[formValidation.requiredSelect]}>
                        {renderList(orderForm.show_color)}
                    </Field>
                </View>

                {this.state.showColor ? <View style={appStyles.my_5}>
                    <Text
                        style={[appStyles.upperCase, appStyles.colorPrimary, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                        Colour
                    </Text>
                    <Field name="colours" placeholder="Colours" component={csTextBox} type="text"/>
                    <View style={[appStyles.flexRow, {justifyContent: "flex-end"}]}>
                        <View style={appStyles.w_65}>
                            <CustomButton btnText={"View Colour Code"} btnIcon={"eye"} onPress={() => {
                                this.onOpenColourURL();
                            }}/>
                        </View>
                    </View>
                </View> : null}

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
    // destroyOnUnmount: false,        // <------ preserve formValues data
    // forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    // enableReinitialize:true
    validate: formValidation.addressValidation
})(PlaceOrderForm);

export default placeOrderForm;