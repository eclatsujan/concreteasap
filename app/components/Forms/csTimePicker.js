import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import {showErrorIcon, showErrorMessage} from "../../helpers/error";

import {appStyles} from "../../../assets/styles/app_styles";

/**
 * to be wrapped with redux-form Field component
 */
export default function csTextBox(props) {
    const {input, meta: {touched, error, warning}, placeholder, ...inputProps} = props;

    const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
        'submitting', 'touched', 'valid', 'visited'];

    let hasError = false;
    if (touched && (error || warning)) {
        hasError = true;
    }

    return (
        <View>
            <Button {...inputProps} style={[appStyles.bgWhite, appStyles.mx7]}>
                <Text
                    style={[appStyles.colorGray44, appStyles.defaultFont, appStyles.baseFontSize]}>{input.value ? input.value : placeholder}</Text>
                {hasError ? showErrorIcon(hasError) : null}
            </Button>
            {hasError ? showErrorMessage(error) : null}
        </View>
    );
}