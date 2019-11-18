import React from 'react';
import {View} from 'react-native';
import {Item as FormItem, Input} from 'native-base';
import {appStyles} from "../../../assets/styles/app_styles";
import {getErrorStyle, showErrorIcon, showErrorMessage} from "../../helpers/error";

/**
 * to be wrapped with redux-form Field component
 */
export default function csTextBox(props) {
    const {input, meta: {touched, error, warning}, ...inputProps} = props;

    const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
        'submitting', 'touched', 'valid', 'visited'];

    let hasError = false;
    if (touched && (error || warning)) {
        hasError = true;
    }

    return (
        <View>
            <FormItem style={[appStyles.loginInput, getErrorStyle(hasError)]} regular>
                <Input
                    placeholderTextColor={"#000000"}
                    style={appStyles.baseFontSize}
                    {...inputProps}
                    defaultValue={input.value}
                    onChangeText={(text)=>{
                        input.onChange(text);
                    }}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                />
                {hasError ? showErrorIcon(hasError) : null}
            </FormItem>
            {hasError ? showErrorMessage(error) : null}
        </View>
    );
}