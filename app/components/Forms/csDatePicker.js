import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, DatePicker} from 'native-base';
import moment from "moment";

import {appStyles} from "../../../assets/styles/app_styles";
import {getErrorStyle, showErrorIcon, showErrorMessage} from "../../helpers/error";
import ConcreteIcon from "../Fonts/ConcreteIcon";


/**
 * to be wrapped with redux-form Field component
 */

export default class csDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.openPicker = this.openPicker.bind(this);
    }

    openPicker() {
        if (this.datePickerRef) {
            this.datePickerRef["showDatePicker"]();
        }
    }

    addDays(n) { // adding the few more days in the current days
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

    render() {
        const {input, meta: {touched, error, warning}, ...inputProps} = this.props;

        const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
            'submitting', 'touched', 'valid', 'visited'];

        let hasError = false;
        if (touched && (error || warning)) {
            hasError = true;
        }

        return (
            <View
                style={[appStyles.flex1, appStyles.flexRow, appStyles.verticalCenter, appStyles.relative, appStyles.bgWhite,
                    appStyles.py_5, appStyles.my_7, appStyles.borderRadiusDefault, appStyles.border, appStyles.borderPrimary]}>
                <View style={[appStyles.w_90]}>
                    <DatePicker
                        ref={(ref) => this.datePickerRef = ref}
                        {...inputProps}
                        defaultDate={new Date()}
                        minimumDate={moment().toDate()}
                        locale={"en"} modalTransparent={false}
                        animationType={"fade"} androidMode={"default"}
                        placeHolderText={input.value ? input.value : this.props.placeholder}
                        textStyle={[appStyles.baseFontSize, appStyles.colorBlack, appStyles.defaultFont]}
                        placeHolderTextStyle={[{color: "#000000"}, appStyles.defaultFont]}
                        onDateChange={(value) => {
                            input.onChange(moment(value).format("DD/MM/YYYY").toString())
                        }}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        disabled={false}/>
                </View>
                <TouchableOpacity style={[appStyles.w_10, appStyles.right_5]} onPress={this.openPicker}>
                    <ConcreteIcon name={"calendar"} style={[appStyles.ft_20, appStyles.colorGray44]}/>
                </TouchableOpacity>
                {hasError ? showErrorMessage(error) : null}
            </View>
        );
    }
}
