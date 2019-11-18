import * as React from 'react';
import {Toast, Text, Icon, View} from 'native-base';
import {appStyles} from "../../assets/styles/app_styles";


export function showErrorMessage(errorMessage) {
    if (typeof errorMessage === undefined || !errorMessage) {
        return;
    }
    if (Array.isArray(errorMessage)) {
        return (
            <View style={{backgroundColor: "red", padding: 2}}>
                {errorMessage.map((error, index) => {
                    return <Text style={{color: "#fff"}} key={index}>{error}</Text>
                })}
            </View>
        );
    } else {
        return (
            <View style={{backgroundColor: "red", padding: 2}}>
                <Text style={{color: "#fff"}}>{errorMessage}</Text>
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
    return condition ? <Icon name='close-circle'/> : <Text></Text>;
}
