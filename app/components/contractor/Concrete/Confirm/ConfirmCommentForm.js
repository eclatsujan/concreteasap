import * as React from "react";
import {Button, Col, Row, Text} from "native-base";
import {appStyles} from "../../../../../assets/styles/app_styles";
import {AirbnbRating} from "react-native-ratings";
import {Field, reduxForm} from "redux-form/lib/immutable";
import csTextArea from "../../../Basic/Forms/csTextArea";
import {formValidation} from "../../../../helpers/validation";
import {View} from "react-native";
import csRating from "../../../Basic/Forms/csRating";

class ConfirmCommentForm extends React.Component{

    constructor(props){
        super(props);
        this.ratingCompleted = this.ratingCompleted.bind(this);
    }

    ratingCompleted(){

    }

    render(){
        const {handleSubmit,onSubmit}=this.props;
        return (
            <View>
                <Row>
                    <Col>
                        <Text style={[appStyles.customFont,appStyles.boldFont]}>Rate Concrete Company</Text>
                    </Col>
                </Row>
                <Row style={[appStyles.borderBottom, appStyles.py_5]}>
                    <Col style={[appStyles.flexAlignLeft, appStyles.horizontalCenter]}>
                        <Field name={"rating"} component={csRating} validate={[formValidation.required]} />
                    </Col>
                </Row>
                <Row style={[appStyles.py_5]}>
                    <Col>
                        <Text style={[appStyles.customFont,appStyles.boldFont]}>COMMENTS</Text>
                    </Col>
                </Row>
                <Row style={[appStyles.py_5]}>
                    <Col>
                        <Field name="comment" placeholder="" component={csTextArea}
                               type="text" validate={[formValidation.required]}/>
                    </Col>
                </Row>
                <Button style={[appStyles.marginDefault, appStyles.horizontalCenter]}
                        onPress={handleSubmit(onSubmit)}>
                    <Text style={appStyles.colorBlack}>Confirm Job Completion</Text>
                </Button>
            </View>
        )
    }
}

let confirmCommentForm = reduxForm(
    {
        form: "orderReview",
        destroyOnUnmount: false,        // <------ preserve formValues data
        forceUnregisterOnUnmount: true,  // <------ unregister fields on unmounts
    })(ConfirmCommentForm);

export default confirmCommentForm;