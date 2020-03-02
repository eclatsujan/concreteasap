import React from "react";
import {View} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";

export default class CustomBorder extends React.Component {

    render(){
        return (
            <View style={appStyles.my_5}>
                <View style={[appStyles.borderBottom, appStyles.borderWhite]}/>
            </View>
        );
    }
}