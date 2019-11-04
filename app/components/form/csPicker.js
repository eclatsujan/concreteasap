import React from 'react';
import {View} from 'react-native';
import {Item as FormItem, Picker} from 'native-base';
import {appStyles} from "../../screens/assets/app_styles";
import {getErrorStyle, showErrorIcon, showErrorMessage} from "../../helpers/error";

/**
 * to be wrapped with redux-form Field component
 */
export default function csPicker(props) {
    const { input: { onChange, value, ...input }, meta: { touched, error, warning },pickerChildren, ...inputProps} = props;


    let hasError=false;

    if(touched && ((error)||(warning))){
        hasError= true;
    }

    return (
        <View>
            <FormItem style={[appStyles.loginInput,getErrorStyle(hasError)]} regular>
                <Picker
                    textStyle={{fontSize: 12}}
                    onValueChange={(value)=>{console.log(value);onChange(value);}}
                    selectedValue={value}
                    {...inputProps}
                    {...input}
                >
                    {props.children}
                </Picker>
                {hasError?showErrorIcon(hasError):null}
            </FormItem>
            {hasError?showErrorMessage(error):null}
        </View>
    );
}