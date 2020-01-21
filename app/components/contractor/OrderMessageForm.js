import * as React from 'react';
import {View} from 'react-native';
import {Field, reduxForm} from "redux-form/lib/immutable";
import {appStyles} from "../../../assets/styles/app_styles";
import {Button, Text} from "native-base";
import csTextBox from "../Forms/csTextBox";
import {formValidation} from "../../helpers/validation";
import navigationHelper from "../../helpers/navigationHelper";

class OrderMessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.onCalculatorClick=this.onCalculatorClick.bind(this);
    }

    onCalculatorClick(){
        navigationHelper.navigate(this.props["calculatorRoute"],{
            "backAction":true,
            "backRoute":this.props["backRoute"]
        });
    }

    render(){
        const {handleSubmit}=this.props;
        return (
            <View>
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
                    <Button style={[appStyles.button, appStyles.buttonPrimary, appStyles.horizontalCenter]}
                            onPress={handleSubmit(this.props.onSubmit)}>
                        <Text style={appStyles.buttonBlack}>Order Message</Text>
                    </Button>
                </View>
            </View>
        );
    }
}


export default reduxForm({
    form: "orderMessage",
    // destroyOnUnmount: false,        // <------ preserve form data
    // forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    enableReinitialize:true
})(OrderMessageForm);