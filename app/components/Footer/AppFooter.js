import React from "react";
import {View} from "native-base";
import {Button, FooterTab, Text, Footer} from "native-base";

import {appStyles} from "../../../assets/styles/app_styles";

import navigationHelper from "../../helpers/navigationHelper";
import CustomButton from "../Button/CustomButton";

export default class AppFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={[appStyles.w_50]}>
                    <CustomButton btnIcon="arrow-left" btnText={"Back"} onPress={() => {
                        this.props["btnBackPress"]();
                    }}/>
                </View>
            </View>
        );
    }
}
