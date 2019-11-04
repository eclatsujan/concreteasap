import * as React from 'react';
import {Button, Text} from 'native-base';

//Custom Plugins for redux
import {connect} from 'react-redux';
//export form data from form folder
import {reduxForm, Field} from "redux-form/immutable";

// Custom Component
import AppBackground from '../../../../components/AppBackground'
import AppHeader from '../../../../components/AppHeader'
import SubHeader from '../../../../components/SubHeader';
import csTextBox from '../../../../components/form/csTextBox';
import csPicker from '../../../../components/form/csPicker';

//form javascript objects
import {orderForm} from "../../../../form/placeOrder";

//helpers
import {formValidation} from '../../../../helpers/validation';
import navigationHelper from "../../../../helpers/navigationHelper";
import {renderList} from "../../../../helpers/app";

//styles
import {appStyles} from "../../../assets/app_styles";

class PlaceOrderRequest extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(values) {
        let order=values;
        order.type="concrete";
        navigationHelper.navigate("Place Order Additional Request", {
            "order":order
        });
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <AppBackground enableKeyBoard>
                <AppHeader/>
                <SubHeader iconName="clipboard" title="Place Order Request"/>

                <Field name="suburb" placeholder="Post Code" component={csTextBox} type="select"
                       validate={[formValidation.required]}/>

                <Field name="quantity" keyboardType="numeric" placeholder="Quantity" component={csTextBox}
                       type="text" validate={[formValidation.required]}/>

                <Field name="type" iosHeader="Type" component={csPicker}
                       validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.types)}
                </Field>

                <Field name="mpa" iosHeader="MPA" component={csPicker}
                       validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.mpa)}
                </Field>

                <Field name="agg" iosHeader="AGG" component={csPicker} mode="dropdown"
                       validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.agg)}
                </Field>


                <Field name="slu" iosHeader="Slump" component={csPicker} mode="dropdown"
                       pickerChildren={orderForm.slu}
                       validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.slu)}
                </Field>

                <Field name="acc" iosHeader="Additional Accelerator" mode="dropdown" component={csPicker}
                       pickerChildren={orderForm.acc} validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.acc)}
                </Field>

                <Field name="placement_type" iosHeader="Placement Type" mode="dropdown" component={csPicker}
                       pickerChildren={orderForm.placement_types} validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.placement_types)}
                </Field>

                <Field name="message_required" iosHeader="Message Required" component={csPicker}
                       validate={[formValidation.requiredSelect]}>
                    {renderList(orderForm.message_required)}
                </Field>

                <Field name="colours" placeholder="Colours" component={csTextBox} type="text"/>

                <Button style={[appStyles.button, appStyles.buttonPrimary,appStyles.horizontalCenter]}
                        onPress={handleSubmit(this.handleSubmit)}>
                    <Text style={appStyles.buttonBlack}>Next</Text>
                </Button>

            </AppBackground>
        );
    }
}


let orderFormRedux = reduxForm({form: "placeOrder"})(PlaceOrderRequest);


export default connect(state => ({
    // alternatively, you can set initial values here...
    initialValues: {
        // suburb: '2144',
        // quantity:20,
        // mpa:"40",
        // agg:"10",
        // slu:"90",
        // acc:"1%",
        // placement_type:"Chute",
        // message_required:"Yes",
        // colours:"red"
    }
}))(orderFormRedux);

