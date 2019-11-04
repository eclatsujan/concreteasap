import React from 'react';
import { TextInput, View, Text } from 'react-native';
import {Item as FormItem, Input, DatePicker} from 'native-base';
import {appStyles} from "../../screens/assets/app_styles";
import {getErrorStyle, showErrorIcon,showErrorMessage} from "../../helpers/error";
import moment from "moment";

/**
 * to be wrapped with redux-form Field component
 */
export default function csDatePicker(props) {
    const { input, meta: { touched, error, warning }, ...inputProps } = props;

    const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
        'submitting', 'touched', 'valid', 'visited'];

    let hasError=false;
    if(touched && (error||warning)){
        hasError= true;
    }

    return (
        <View>
            <FormItem style={[appStyles.loginInput,getErrorStyle(hasError)]} regular>
                <DatePicker
                    {...inputProps}
                    defaultDate={new Date(addDays(5))}
                    minimumDate={new Date(2019, 1, 1)}
                    maximumDate={new Date(2020, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={"UTC +10:00 / +11:00"}
                    //dateFormat={"yyyy/MM/dd"}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Please Select Date"
                    textStyle={{color: "#000", fontSize: 13}}
                    placeHolderTextStyle={[{color: "#000"},appStyles.defaultFont]}
                    onDateChange={(value)=>{
                        input.onChange(moment(value).format("DD/MM/YYYY").toString())
                    }}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    disabled={false}
                />
                {hasError?showErrorIcon(hasError):null}
            </FormItem>
            {hasError?showErrorMessage(error):null}
        </View>
    );
}

function addDays(n) { // adding the few more days in the current days
    let t = new Date();
    //console.log(t);
    t.setDate(t.getDate() + n);
    let month = "0" + (t.getMonth() + 1);
    let date = "0" + t.getDate();
    month = month.slice(-2);
    date = date.slice(-2);
    let full_date = t.getFullYear() + '-' + month + '-' + date;

    return (full_date);
}