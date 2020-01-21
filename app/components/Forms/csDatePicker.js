import React from 'react';
import {TouchableOpacity, DatePickerIOS} from 'react-native';
import {View, DatePicker, Text} from 'native-base';
import moment from "moment";

import {appStyles} from "../../../assets/styles/app_styles";
import {showErrorMessage} from "../../helpers/error";
import ConcreteIcon from "../Fonts/ConcreteIcon";

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


/**
 * to be wrapped with redux-form Field component
 */

export default class csDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.openPicker = this.openPicker.bind(this);
    }

    openPicker() {
        this.props["onToggle"]();
    }

    addDays(n) { // adding the few more days in the current days
        let t = new Date();
        t.setDate(t.getDate() + n);
        let month = "0" + (t.getMonth() + 1);
        let date = "0" + t.getDate();
        month = month.slice(-2);
        date = date.slice(-2);
        let full_date = t.getFullYear() + '-' + month + '-' + date;

        return (full_date);
    }

    formatValue(value, dateFormat = "DD/MM/YYYY") {
        return moment(value, dateFormat).format("DD/MM/YYYY").toString();
    }

    displayPlaceHolderText(value, placeholder, dateFormat) {
        return !value ? placeholder : this.formatValue(value, dateFormat);
    }

    render() {
        const {input, meta: {touched, error, warning}, ...inputProps} = this.props;

        const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
            'submitting', 'touched', 'valid', 'visited'];

        let hasError = false;
        if (touched && (error || warning)) {
            hasError = true;
        }
        let dateFormat = this.formatValue(input.value) === "Invalid date" ? "YYYY-MM-DD" : "DD/MM/YYYY";
        return (
            <TouchableOpacity onPress={this.openPicker}>
                <View
                    style={[appStyles.flex1, appStyles.flexRow, appStyles.verticalCenter, appStyles.bgWhite,
                        appStyles.p_10, appStyles.my_7, appStyles.borderRadiusDefault, appStyles.border]}>
                    <View style={[appStyles.w_90]}>
                        <Text>{this.displayPlaceHolderText(input.value, this.props.placeholder, dateFormat)}</Text>
                    </View>
                    <View style={[appStyles.w_10, appStyles.right_5]}>
                        <ConcreteIcon name={"calendar"} style={[appStyles.ft_20, appStyles.colorGray44]}/>
                    </View>
                    {hasError ? showErrorMessage(error) : null}
                </View>
            </TouchableOpacity>
        );
    }
}
