import * as React from "react";
import {Button, Text, View} from "native-base";
import {appStyles} from "../../../assets/styles/app_styles";
import {Field, reduxForm} from "redux-form/lib/immutable";
import csTextArea from "../Forms/csTextArea";
import {formValidation} from "../../helpers/validation";


class SpecialOrderForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.boldFont, appStyles.colorPrimary]}>Special Instructions</Text>
                    <Field name="special_instructions" rowSpan={5} component={csTextArea} type="text"
                           validate={[formValidation.required]}/>
                </View>
                <View style={appStyles.my_5}>
                    <Text style={[appStyles.boldFont, appStyles.colorPrimary]}>Delivery Instructions</Text>
                    <Field name="delivery_instructions" rowSpan={5} component={csTextArea} type="text"
                           validate={[formValidation.required]}/>
                </View>
                <Button style={[appStyles.button, appStyles.bgPrimary, appStyles.horizontalCenter]}
                        onPress={handleSubmit(this.props.onSubmit)}>
                    <Text style={appStyles.colorBlack}>Next</Text>
                </Button>
            </View>
        );
    }
}

let specialOrderForm = reduxForm({
    form: "placeOrder",
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(SpecialOrderForm);

export default specialOrderForm;