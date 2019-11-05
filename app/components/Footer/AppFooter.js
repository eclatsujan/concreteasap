import React from "react";
import {Button,FooterTab, Text, Footer} from "native-base";

import {appStyles} from "../../../assets/styles/app_styles";

import navigationHelper from "../../helpers/navigationHelper";

export default class AppFooter extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Footer style={appStyles.mb_30}>
                <FooterTab>
                    <Button style={[appStyles.button, appStyles.buttonPrimary]}
                            onPress={() => navigationHelper.navigate("Home")}>
                        <Text style={appStyles.buttonBlack}>Back to Home</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
