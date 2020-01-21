import * as React from 'react';
import {Picker} from "native-base";
import {Platform} from "react-native";
import {appStyles} from '../../assets/styles/app_styles'

export function renderList(data) {
    let view = [];
    if (Array.isArray(data)) {
        data.forEach(function (element) {
            view.push(
                <Picker.Item style={[appStyles.defaultFont, appStyles.baseFontSize]} label={element.label}
                             value={element.key !== "" ? element.label : ""} key={element.key}/>
            );
        });
    }
    return view;
}

export function getNested(theObject, path, separator) {
    try {
        separator = separator || '.';
        return path.replace('[', separator).replace(']', '').split(separator).reduce(
            function (obj, property) {
                return obj[property];
            }, theObject
        );
    } catch (err) {
        return undefined;
    }
}

export function getNestedImmutable(theObject, path, separator) {
    try {
        separator = separator || '.';

        return theObject.getIn(path.replace('[', separator).replace(']', '').split(separator));
    } catch (err) {
        return undefined;
    }
}

export function isBoolean(obj) {
    return typeof obj === "boolean";
}

export function boolToAffirmative(obj) {
    return !obj ? "No" : "Yes"
}

export function getPhoneURL(number) {
    let phoneNumber;
    if (Platform.OS === 'android') {
        phoneNumber = 'tel:${' + number + '}';
    } else {
        phoneNumber = 'telprompt:${' + number + '}';
    }
    return phoneNumber;
}