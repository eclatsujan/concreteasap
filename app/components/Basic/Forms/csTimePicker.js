import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import {showErrorMessage} from "../../../helpers/error";

import {appStyles} from "../../../../assets/styles/app_styles";
import ConcreteIcon from "../Fonts/ConcreteIcon";
import {formatTime} from "../../../helpers/time";

/**
 * to be wrapped with redux-formValues Field component
 */
export default function csTimePicker(props) {
    const {input, meta: {touched, error, warning}, placeholder, ...inputProps} = props;

    const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
        'submitting', 'touched', 'valid', 'visited'];

    let hasError = false;
    if (touched && (error || warning)) {
        hasError = true;
    }

    return (
        <View>
            <Button {...inputProps}
                    style={[appStyles.bgWhite, appStyles.my_7, appStyles.borderRadiusDefault]}>
                <View style={appStyles.w_90}>
                    <Text
                        style={[appStyles.colorBlack, appStyles.defaultFont, appStyles.capitalCase,
                                appStyles.baseFontSize,appStyles.upperCase]}>
                        {input.value ? formatTime(input.value) : placeholder}
                    </Text>
                </View>
                <View style={appStyles.w_10}>
                    <ConcreteIcon name={"clock"} style={[appStyles.ft_20,appStyles.colorGray44]}/>
                </View>
            </Button>
            {hasError ? showErrorMessage(error) : null}
        </View>
    );
}