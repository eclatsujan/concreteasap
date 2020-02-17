import * as React from "react";
import {Row, Text, View} from "native-base";
import {appStyles} from "../../../../assets/styles/app_styles";
import {Animated} from "react-native";
import ButtonIcon from "../../Button/ButtonIcon";


export default class CustomOrderView extends React.Component {

    constructor(props) {
        super(props);
    }

    getColor(status) {
        let status_colors = {"Complete": "#2E7400", "Cancelled": "#FF0000"};
        let color = status_colors[status] ? status_colors[status] : "#000000";
        return {color};
    }

    render() {
        let order = this.props["order"];

        return (
            <Animated.View
                style={[appStyles.py_10, appStyles.borderBottom,appStyles.bgWhite,appStyles.px_10]}>
                <Row>
                    <View style={[appStyles.flexRow, appStyles.pb_5]}>
                        <View style={[appStyles.flexRow, {alignItems: "flex-end"}]}>
                            <Text style={[appStyles.baseSmallFontSize, appStyles.upperCase, appStyles.boldFont]}>
                                Order ID:#
                            </Text>
                            <Text
                                style={[appStyles.arialFont, appStyles.baseSmallFontSize]}>{order?.get("job_id")}</Text>
                            <Text
                                style={[appStyles.baseSmallFontSize, appStyles.pl_20, appStyles.upperCase, appStyles.boldFont]}>
                                Status:
                            </Text>
                            <Text
                                style={[appStyles.pl_5, appStyles.baseSmallFontSize, appStyles.arialFont, this.getColor(order?.get("status"))]}>
                                {order?.get("status")}
                            </Text>
                        </View>
                    </View>
                </Row>
                <View style={[appStyles.flexRow, appStyles.flexWrap, appStyles.py_5, appStyles.w_90]}>
                    <View style={[appStyles.pr_5, appStyles.mb_10]}>
                        <ButtonIcon small
                                    btnText={"View Details"}
                                    onPress={() => {
                                        this.props["onDetailHandler"] ? this.props["onDetailHandler"](order?.get("id")) : null;
                                    }}/>
                    </View>
                    <View style={appStyles.pr_5}>
                        <ButtonIcon small
                                    btnText={"Archive"}
                                    iconName={"archive"}
                                    btnBgColor={"#707070"}
                                    onPress={() => {
                                        this.props["onArchiveHandler"](order?.get("id"));
                                    }}/>
                    </View>
                </View>
            </Animated.View>
        )
    }
}