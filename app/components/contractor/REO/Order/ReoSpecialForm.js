import * as React from 'react';
import {Button, Text, View} from "native-base";
import {appStyles} from "../../../../../assets/styles/app_styles";
import {Field, reduxForm} from "redux-form/lib/immutable";
import csTextArea from "../../../Basic/Forms/csTextArea";
import FieldHeader from "../../../Basic/Forms/FieldHeader";
import CustomButton from "../../../Basic/Button/CustomButton";

class ReoSpecialFormFields extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Special Instructions"}/>
                    <Field name="special_instructions" rowSpan={5} component={csTextArea} type="text"/>
                </View>
                <View style={appStyles.my_5}>
                    <FieldHeader title={"Delivery Instructions"}/>
                    <Field name="delivery_instructions" rowSpan={5} component={csTextArea} type="text"/>
                </View>
                <CustomButton mainBtnColor={appStyles.bgBluelgt} btnText={"Next"} onPress={handleSubmit(this.props.onSubmit)}/>
            </View>
        );
    }
}

let ReoSpecialForm = reduxForm({
    form: "placeReoOrder",
    destroyOnUnmount: false,        // <------ preserve formValues data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(ReoSpecialFormFields);

export default ReoSpecialForm;