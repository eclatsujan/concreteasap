import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, Picker } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {appStyles} from "../../../../assets/styles/app_styles";

class TimePicker extends Component {
    constructor(props) {
        super(props);
        const { selectedHour, selectedMinute } = props;
        this.state = { selectedHour, selectedMinute };
    }

    getHourItems = () => {
        const items = [];
        const { maxHour, hourInterval, hourUnit } = this.props;
        const interval = maxHour / hourInterval;
        for (let i = 0; i <= interval; i++) {
            const value = `${i * hourInterval}`;
            const item = (
                <Picker.Item key={value} value={value} label={value + hourUnit} />
            );
            items.push(item);
        }
        return items;
    };

    getMinuteItems = () => {
        const items = [];
        const { maxMinute, minuteInterval, minuteUnit } = this.props;
        const interval = maxMinute / minuteInterval;
        for (let i = 0; i <= interval; i++) {
            const value = i * minuteInterval;
            const new_value = value < 10 ? `0${value}` : `${value}`;
            const item = (
                <Picker.Item
                    key={value}
                    value={new_value}
                    label={new_value + minuteUnit}
                />
            );
            items.push(item);
        }
        return items;
    };

    onValueChange = (selectedHour, selectedMinute) => {
        this.setState({ selectedHour, selectedMinute });
    };

    onCancel = () => {
        if (typeof this.props.onCancel === "function") {
            const { selectedHour, selectedMinute } = this.state;
            this.props.onCancel(selectedHour, selectedMinute);
        }
    };

    onConfirm = () => {
        if (typeof this.props.onConfirm === "function") {
            const { selectedHour, selectedMinute } = this.state;
            this.props.onConfirm(selectedHour, selectedMinute);
        }
    };

    close = () => {
        this.RBSheet.close();
    };

    open = () => {
        this.RBSheet.open();
    };

    renderHeader = () => {
        const { textCancel, textConfirm } = this.props;
        return (
            <View style={appStyles.tp_header}>
                <TouchableOpacity onPress={this.onCancel} style={appStyles.tp_buttonAction}>
                    <Text style={[appStyles.buttonText, appStyles.tp_buttonTextCancel]}>
                        {textCancel}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onConfirm} style={appStyles.tp_buttonAction}>
                    <Text style={appStyles.buttonText}>{textConfirm}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderBody = () => {
        const { selectedHour, selectedMinute } = this.state;
        return (
            <View style={appStyles.tp_body}>
                <Picker
                    selectedValue={selectedHour}
                    style={appStyles.tp_picker}
                    itemStyle={this.props.itemStyle}
                    onValueChange={itemValue =>
                        this.onValueChange(itemValue, selectedMinute)
                    }
                >
                    {this.getHourItems()}
                </Picker>
                <Text style={appStyles.tp_separator}>:</Text>
                <Picker
                    selectedValue={selectedMinute}
                    style={appStyles.tp_picker}
                    itemStyle={this.props.itemStyle}
                    onValueChange={itemValue =>
                        this.onValueChange(selectedHour, itemValue)
                    }
                >
                    {this.getMinuteItems()}
                </Picker>
            </View>
        );
    };

    render() {
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
            >
                {this.renderHeader()}
                {this.renderBody()}
            </RBSheet>
        );
    }
}

TimePicker.propTypes = {
    maxHour: PropTypes.number,
    maxMinute: PropTypes.number,
    hourInterval: PropTypes.number,
    minuteInterval: PropTypes.number,
    hourUnit: PropTypes.string,
    minuteUnit: PropTypes.string,
    selectedHour: PropTypes.string,
    selectedMinute: PropTypes.string,
    itemStyle: PropTypes.object,
    textCancel: PropTypes.string,
    textConfirm: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
};

TimePicker.defaultProps = {
    maxHour: 23,
    maxMinute: 59,
    hourInterval: 1,
    minuteInterval: 1,
    hourUnit: "",
    minuteUnit: "",
    selectedHour: "0",
    selectedMinute: "00",
    itemStyle: {},
    textCancel: "Cancel",
    textConfirm: "Done"
};

export default TimePicker;