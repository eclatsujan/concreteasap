import React from 'react';
import {View} from 'react-native';
import {Textarea} from 'native-base';
import  {showErrorMessage} from "../../../helpers/error";

import {appStyles} from "../../../../assets/styles/app_styles";

/**
 * to be wrapped with redux-formValues Field component
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
            <Textarea defaultValue={input.value} {...inputProps} rowSpan={5} bordered style={[appStyles.bgWhite,appStyles.paddingX7]} onChangeText={input.onChange}/>
            {hasError ? showErrorMessage(error) : null}
        </View>
    );
}