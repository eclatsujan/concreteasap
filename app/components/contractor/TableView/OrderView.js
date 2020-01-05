import * as React from 'react';
import {Animated} from 'react-native';
import {View, Row, Col, Text, Icon} from 'native-base';
import ButtonIcon from "../../Button/ButtonIcon";
import {appStyles} from "../../../../assets/styles/app_styles";

export default class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(1),
            transformScale: new Animated.Value(1),
            height:new Animated.Value(1)
        };
        this.closeAnimation = this.closeAnimation.bind(this);
    }

    componentDidMount() {

    }

    getColor(status) {
        let status_colors = {"Complete": "#2E7400", "Cancelled": "#FF0000"};
        let color = status_colors[status] ? status_colors[status] : "#000000";
        return {color};
    }

    closeAnimation() {
        Animated.parallel([
            // Animated.timing(
            //     this.state.height,
            //     {
            //         toValue:0,
            //         duration:1000
            //     }
            // ),
            // Animated.timing(
            //     this.state.opacity,
            //     {
            //         toValue:0,
            //         duration:1000
            //     }
            // )
        ]).start(()=>{
            this.props["onArchiveHandler"](this.props["order"]);
        });

    }

    render() {
        let order_id = this.props["order"].get("order_id");
        let id = this.props["order"].get("id");
        let status = this.props["order"].get("status");
        let bids = this.props["order"].get("bids");
        let height=this.state.height._value===1?"auto":this.state.height;
        return (
            <Animated.View
                style={[{opacity: this.state.opacity,height},appStyles.py_10, appStyles.borderBottom, appStyles.mx_10]}>
                <Row>
                    <View style={[appStyles.flexRow, appStyles.pb_5]}>
                        <View style={[appStyles.flexRow, {alignItems: "flex-end"}]}>
                            <Text style={[appStyles.baseSmallFontSize, appStyles.upperCase, appStyles.boldFont]}>
                                Order ID:#
                            </Text>
                            <Text
                                style={[appStyles.arialFont, appStyles.baseSmallFontSize]}>{id}</Text>
                            <Text
                                style={[appStyles.baseSmallFontSize, appStyles.pl_20, appStyles.upperCase, appStyles.boldFont]}>
                                Status:
                            </Text>
                            <Text
                                style={[appStyles.pl_5, appStyles.baseSmallFontSize, appStyles.arialFont, this.getColor(status)]}>
                                {status}
                            </Text>
                        </View>
                    </View>
                </Row>
                {status === "Complete" || status === "Cancelled" ?
                    <Row style={[appStyles.pb_5]}>
                        <Col>
                            <View style={[appStyles.flexRow]}>
                                <Text style={[appStyles.baseSmallFontSize, appStyles.upperCase]}>Company:</Text>
                                <Text
                                    style={[appStyles.arialFont, appStyles.baseSmallFontSize]}>
                                    {bids?.get(0)?.get("user").get("detail").get("company")}
                                </Text>
                            </View>
                        </Col>
                    </Row>
                    : null}
                <View style={[appStyles.flex1, appStyles.flexRow]}>
                    <View style={[appStyles.flexRow, appStyles.flexWrap, appStyles.py_5, appStyles.w_90]}>
                        <View>
                            {status !== "Complete" && status !== "Cancelled" ?
                                <ButtonIcon small
                                            btnText={this.props["buttonViewText"]}
                                            onPress={() => {
                                                this.props["onViewHandler"](this.props["order"])
                                            }}/> : null}
                        </View>
                        <View style={[appStyles.pr_5, appStyles.mb_10]}>
                            <ButtonIcon small
                                        btnText={"View Details"}
                                        onPress={() => {
                                            this.props["onDetailHandler"] ? this.props["onDetailHandler"](this.props["order"]) : null;
                                        }}/>
                        </View>
                        <View style={appStyles.pr_5}>
                            <ButtonIcon small
                                        btnText={"Archive"}
                                        iconName={"archive"}
                                        btnBgColor={"#707070"}
                                        onPress={() => {
                                            this.closeAnimation();
                                        }}/>
                        </View>
                    </View>
                    <View style={appStyles.w_10}>
                        {status !== "Complete" && status !== "Cancelled" ?
                            <View
                                style={[appStyles.smallCircleNoBorder, appStyles.bgPrimary, appStyles.justifyItemsCenter]}>
                                <Text style={[appStyles.boldFont, appStyles.ft_20]}>
                                    {bids?.size}
                                </Text>
                            </View>
                            : null}
                    </View>
                </View>
            </Animated.View>
        );
    }

}