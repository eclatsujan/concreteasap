import * as React from 'react';
import {View, Button, Row, Col, Text, Picker} from 'native-base'
import {Field, reduxForm, Form} from "redux-form/lib/immutable";
import {appStyles} from "../../../../assets/styles/app_styles";
import csTextBox from "../../../components/Forms/csTextBox";
import {formValidation} from "../../../helpers/validation";
import AppBackground from "../../../components/AppBackground";
import csPicker from "../../../components/Forms/csPicker";


class UserProfileForm extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <View>
                <Field name="company" placeholder="Company" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Field name="abn" placeholder="ABN" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Field name="title" placeholder="Title" component={csPicker} type="input"
                       validate={[formValidation.required]}>
                    <Picker.Item style={[appStyles.baseFont]} label={"Mr"} value={"Mr"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"Mrs"} value={"Mrs"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"Miss"} value={"Miss"}/>
                </Field>

                <Field name="first_name" placeholder="First Name" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Field name="last_name" placeholder="Email" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Field name="email" placeholder="Last Name" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Field name="phone_number" placeholder="Phone" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Field name="state" placeholder="State" component={csPicker} type="input"
                       validate={[formValidation.required]}>
                    <Picker.Item style={[appStyles.baseFont]} label={"NSW"} value={"NSW"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"ACT"} value={"ACT"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"SA"} value={"SA"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"TAS"} value={"TAS"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"NT"} value={"NT"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"VIC"} value={"VIC"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"WA"} value={"WA"}/>
                </Field>

                <Field name="city" placeholder="City" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Row>
                    <Col>
                        <View style={appStyles.w_90}>
                            <Button style={[appStyles.flexRow, appStyles.flexCenter]}>
                                <Text style={[appStyles.colorBlack, appStyles.txtCenter]}>Cancel</Text>
                            </Button>
                        </View>
                    </Col>
                    <Col>
                        <View style={[appStyles.w_90, appStyles.flex1, appStyles.selfRight]}>
                            <Button style={[appStyles.flexRow, appStyles.flexCenter]}
                                    onPress={handleSubmit(this.props["accountSubmit"])} disabled={submitting}>
                                <Text style={[appStyles.colorBlack, appStyles.txtCenter]}>Save Changes</Text>
                            </Button>
                        </View>
                    </Col>
                </Row>
            </View>
        );
    }

}

let userProfileForm = reduxForm({form: "userProfileForm", enableReinitialize: true})(UserProfileForm);

export default userProfileForm;