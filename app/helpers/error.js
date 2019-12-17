import * as React from 'react';
import {Toast, Text, Icon, View} from 'native-base';
import {appStyles} from "../../assets/styles/app_styles";


export function showErrorMessage(errorMessage) {
    if (typeof errorMessage === undefined || !errorMessage) {
        return;
    }
    if (Array.isArray(errorMessage)) {
        return (
            <View style={[appStyles.bgDanger,appStyles.p_5]}>
                {errorMessage.map((error, index) => {
                    return <Text style={appStyles.colorWhite} key={index}>{error}</Text>
                })}
            </View>
        );
    } else {
        return (
            <View style={[appStyles.bgDanger,appStyles.p_5]}>
                <Text style={appStyles.colorWhite}>{errorMessage}</Text>
            </View>
        );
    }

}

export function showToastMessage(toastMsg,toastType) {
    if (toastMsg !== "") {
        Toast.show({
            text: toastMsg,
            duration: 3500,
            position: 'top',
            style: {
                backgroundColor: "#14E22A",
                marginLeft: 15,
                marginRight: 15,
                paddingTop: 5,
                paddingBottom: 5
            },
            textStyle:{
              color:"#000"
            }
        });
    }
}

export function getErrorStyle(condition) {
    return condition ? {
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: "red"
    } : {};
}

export function showErrorIcon(condition) {
    return condition ? <Icon name='close-circle'/> : null;
}
