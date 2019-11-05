import * as React from 'react';
import {ScrollView} from 'react-native';
import {Button, Text, Content} from 'native-base';
//Redux
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form/immutable";

// Custom Component
import AppBackground from '../../../../components/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'
import csTextArea from "../../../../components/Forms/csTextArea";

//Helpers
import {formValidation} from "../../../../helpers/validation";

//StyleSheet
import {appStyles} from "../../../assets/app_styles";
import {styles} from '../../styles.js';

class SpecialRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            specialInstructions: "",
            deliveryInstructions: "",
        };
        this.submit = this.submit.bind(this);
    }

    setSpecialRequest(key, value) {
        this.state[key] = value;
    }

    submit(order) {
        this.props.navigation.navigate("ReviewOrder", {special: this.state,order});
    }


    render() {
        /* 2. Read the params from the navigation state */
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;

        return (
            <AppBackground enableKeyBoard>
                <AppHeader backMenu/>
                <Content>
                    <ScrollView style={appStyles.pb_45}>
                        <SubHeader iconName="clipboard" title="Special Requests"/>
                        <Text style={[appStyles.baseFont, appStyles.colorPrimary]}>Special Instructions</Text>
                        <Field name="special_instructions" rowSpan={5} component={csTextArea} type="text"
                               validate={[formValidation.required]}/>

                        <Text style={[appStyles.baseFont, appStyles.colorPrimary]}>Delivery Instructions</Text>

                        <Field name="delivery_instructions" rowSpan={5} component={csTextArea} type="text"
                             validate={[formValidation.required]}/>

                        <Button style={[appStyles.button,appStyles.bgPrimary,appStyles.horizontalCenter]} onPress={() => this.submit(order)}>
                            <Text style={appStyles.colorBlack}>Next</Text>
                        </Button>
                    </ScrollView>
                </Content>
            </AppBackground>
        );
    }
}

let orderSpecialRequests = reduxForm({form: "specialRequests"})(SpecialRequests);


export default connect(state => ({
  // alternatively, you can set initial values here...
  initialValues: {

  }
}))(orderSpecialRequests);
