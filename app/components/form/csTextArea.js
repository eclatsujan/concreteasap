import React from 'react';
import {View} from 'react-native';
import {Item as FormItem, Textarea} from 'native-base';
import {appStyles} from "../../screens/assets/app_styles";
import {getErrorStyle, showErrorIcon, showErrorMessage} from "../../helpers/error";

/**
 * to be wrapped with redux-form Field component
 */
export default function csTextArea(props) {
    const {input, meta: {touched, error, warning}, ...inputProps} = props;

    const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
        'submitting', 'touched', 'valid', 'visited'];

    let hasError = false;
    if (touched && (error || warning)) {
        hasError = true;
    }

    return (
        <View>
            <Textarea {...inputProps} rowSpan={5} bordered style={[appStyles.bgWhite,appStyles.paddingX7]} onChangeText={input.onChange}/>
            {hasError ? showErrorMessage(error) : null}
        </View>
    );
}