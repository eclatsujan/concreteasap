import React from "react";
import {Button, Text, Footer, FooterTab, View} from "native-base";

import navigationHelper from "../../../helpers/navigationHelper";
import {appStyles} from "../../../../assets/styles/app_styles";

export default class CalculatorTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    navigate(routeName, params) {
        navigationHelper.navigate(routeName, params);
    }

    render() {
        let active = this.props["firstButton"] ? appStyles.colorWhite : appStyles.colorBlack;
        let params = {
            backAction: this.props?.["backAction"],
            backRoute: this.props?.["backRoute"]
        };
        return (
            <View style={[appStyles.my_5,appStyles.flex1,appStyles.flexRow,appStyles.justifySpace]}>
                <View>
                    <Button active={!!this.props["firstButton"]}
                            style={[this.props["firstButton"] ? appStyles.bgSecondary : {}, appStyles.noBorder]}
                            onPress={() => this.navigate("firstCalculator", params)}>
                        <Text
                            style={[active, appStyles.arialFont, appStyles.boldFont, appStyles.ft_small]}>
                            Slab
                        </Text>
                    </Button>
                </View>
                <View>
                    <Button active={!!this.props["secondButton"]}
                            style={[this.props["secondButton"] ? appStyles.bgSecondary : {}, appStyles.noBorder]}
                            onPress={() => this.navigate("secondCalculator", params)}>
                        <Text
                            style={[this.props["secondButton"] ? appStyles.colorWhite : appStyles.colorBlack,
                                appStyles.arialFont, appStyles.boldFont, appStyles.ft_small]}>
                            Footing
                        </Text>
                    </Button>
                </View>
                <View>
                    <Button active={!!this.props["thirdButton"]}
                            style={[this.props["thirdButton"] ? appStyles.bgSecondary : {}, appStyles.noBorder]}
                            onPress={() => this.navigate("thirdCalculator", params)}>
                        <Text
                            style={[this.props["thirdButton"] ? appStyles.colorWhite : appStyles.colorBlack,
                                appStyles.arialFont, appStyles.boldFont, appStyles.ft_small]}>
                            Column
                        </Text>
                    </Button>
                </View>
            </View>

        );
    }

}
