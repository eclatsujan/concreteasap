import * as React from 'react';
import {View, Button, Row, Col, Text, Picker} from 'native-base'
import {Field, reduxForm} from "redux-form/lib/immutable";
import {appStyles} from "../../../../assets/styles/app_styles";
import csTextBox from "../../../components/Forms/csTextBox";
import {formValidation} from "../../../helpers/validation";
import csPicker from "../../../components/Forms/csPicker";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import csImageInput from "../../../components/Forms/csImageInput";


class UserProfileForm extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPermissionAsync().then((res) => {

        });
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    async uploadLogo() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            if (result.type !== "image") {
                alert("Please Select the valid type of file");
            }
        }
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <View>
                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Company</Text>
                <Field name="company" placeholder="Company" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>ABN</Text>
                <Field name="abn" placeholder="ABN" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Logo</Text>
                <Field name="profile_image" placeholder={"profile_image"} component={csImageInput} type={"dropdown"} />

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Title</Text>
                <Field name="title" placeholder="Title" component={csPicker} type="input"
                       validate={[formValidation.required]}>
                    <Picker.Item style={[appStyles.baseFont]} label={"Mr"} value={"Mr"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"Mrs"} value={"Mrs"}/>
                    <Picker.Item style={[appStyles.baseFont]} label={"Miss"} value={"Miss"}/>
                </Field>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>First Name</Text>
                <Field name="first_name" placeholder="First Name" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Last Name</Text>
                <Field name="last_name" placeholder="Last Name" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Email</Text>
                <Field name="email" placeholder="Email" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>Phone</Text>
                <Field name="phone_number" placeholder="Phone" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>City</Text>
                <Field name="city" placeholder="City" component={csTextBox} type="input"
                       validate={[formValidation.required]}/>

                <Text style={[appStyles.upperCase, appStyles.colorPrimary]}>State</Text>
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

                <Row>
                    <Col>
                        <View style={appStyles.w_90}>
                            <Button style={[appStyles.flexRow, appStyles.flexCenter]}
                                    onPress={this.props["cancelHandler"]}>
                                <Text style={[appStyles.colorBlack, appStyles.txtCenter]}>Cancel</Text>
                            </Button>
                        </View>
                    </Col>
                    <Col>
                        <View style={[appStyles.w_90, appStyles.flex1, appStyles.selfRight]}>
                            <Button style={[appStyles.flexRow, appStyles.flexCenter]}
                                    onPress={handleSubmit(this.props.onSubmit)} >
                                <Text style={[appStyles.colorBlack, appStyles.txtCenter]}>Save Changes</Text>
                            </Button>
                        </View>
                    </Col>
                </Row>
            </View>
        );
    }

}

let userProfileForm = reduxForm({form: "userProfile"})(UserProfileForm);


export default userProfileForm;