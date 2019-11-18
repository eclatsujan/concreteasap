import React from 'react';
import {View} from 'react-native';
import {Picker} from 'native-base';
import {getErrorStyle, showErrorIcon, showErrorMessage} from "../../helpers/error";

import {appStyles} from "../../../assets/styles/app_styles";

/**
 * to be wrapped with redux-form Field component
 */
export default function csPicker(props) {
    const {input: {onChange, value, ...input}, meta: {touched, error, warning}, pickerChildren, ...inputProps} = props;

    console.log(value);
    let hasError = false;

    if (touched && ((error) || (warning))) {
        hasError = true;
    }

    return (
        <View>
            <View style={[appStyles.bgWhite, appStyles.my_7, appStyles.borderRadiusDefault]}>
                <Picker
                    textStyle={[appStyles.fontSize,appStyles.defaultFont]}
                    itemTextStyle={[appStyles.baseFontSize,appStyles.defaultFont]}
                    headerTitleStyle={[appStyles.baseFontSize,appStyles.defaultFont]}
                    headerBackButtonTextStyle={[appStyles.baseFontSize,appStyles.defaultFont]}
                    // headerStyle=
                    onValueChange={(val) => {
                        requestAnimationFrame(() => {
                            onChange(val);
                        })
                    }}
                    mode={"dropdown"}
                    selectedValue={value}
                    {...inputProps}
                    {...input}
                >
                    {props.children}
                </Picker>
            </View>
            {hasError ? showErrorMessage(error) : null}
        </View>
    );
}