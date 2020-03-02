import * as React from "react";
import {TouchableOpacity, Linking,FlatList} from "react-native";
import {Field, reduxForm, SubmissionError} from "redux-form/lib/immutable";
import {Button, Text, View} from "native-base";
import {appStyles} from "../../../../../assets/styles/app_styles";
import csTextBox from "../../../Basic/Forms/csTextBox";
import {formValidation} from "../../../../helpers/validation";
import csPicker from "../../../Basic/Forms/csPicker";
import {renderList} from "../../../../helpers/app";
import {ReoFormValues} from "../../../../formValues/REO";
import csMapBoxPicker from "../../../Basic/Forms/csMapBoxPicker";
import navigationHelper from "../../../../helpers/navigationHelper";
import FieldHeader from '../../../Basic/Forms/FieldHeader';

class PlaceReoOrderForm extends React.Component {

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
            .openURL("https://www.concretecoloursystems.com.au")
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
                        style={[appStyles.upperCase, appStyles.boldFont, appStyles.baseLargeFontSize, appStyles.colorBlueLgt]}>
                        Address
                    </Text>
                    <Field name="address" placeholder="Address" component={csMapBoxPicker} onMapPick={this.onMapPick}
                           type="text" validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <View>
                        <Text
                            style={[appStyles.upperCase, appStyles.colorBlueLgt, appStyles.boldFont, appStyles.baseLargeFontSize]}>
                            Post Code
                        </Text>
                    </View>

                    <Field name="post_code" placeholder="Post Code" keyboardType="numeric" component={csTextBox}
                           type="select"
                           validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Mesh"} icon={"mesh"} />
                    <Field name="mesh" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.mesh)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Trench Mesh"} icon={"trench"} />
                    <Field name="trench_mesh" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.trench_mesh)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Stock Bar"} icon={"stock"} />
                    <Field name="stock_bar" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.stock_bar)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Starter Bar Mesh"} icon={"starter"} />
                    <Field name="starter_bar_mesh" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.starter_bar)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Ligatures"} icon={"ligatures"} />
                    <Field name="ligatures" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.ligatures)}
                    </Field>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Swimming Pool Reo"} icon={"pool"} />
                    <Field name="swimming_pool_reo" iosHeader="Type" component={csPicker}>
                        {renderList(ReoFormValues.swimming_pool_reo)}
                    </Field>
                </View>

                <View style={appStyles.my_5}>
                    <Button style={[appStyles.button, appStyles.bgBluelgt, appStyles.horizontalCenter]}
                            onPress={handleSubmit(this.props.onSubmit)}>
                        <Text style={appStyles.buttonBlack}>Next</Text>
                    </Button>
                </View>
            </View>
        );
    }

}

let placeReoOrderForm = reduxForm({
    form: "placeReoOrder",
    destroyOnUnmount: false,        // <------ preserve formValues data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    // enableReinitialize:true
    // validate: formValidation.addressValidation
})(PlaceReoOrderForm);

export default placeReoOrderForm;