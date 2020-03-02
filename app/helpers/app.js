import * as React from 'react';
import {Picker} from "native-base";
import {Dimensions,Platform,PixelRatio} from "react-native";
import {appStyles} from '../../assets/styles/app_styles'

export function renderList(data) {
    let view = [];
    if (Array.isArray(data)) {
        data.forEach(function (element) {
            view.push(
                <Picker.Item disabled style={[appStyles.defaultFont, appStyles.baseFontSize]} label={element.label}
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

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export function isDefined(type){
    return typeof type!=="undefined"&&type!==null;
}